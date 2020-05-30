var express = require("express");
var router = express.Router();
var fs = require("fs");
// suuuuuper important!
const db = require("../model/helper");

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  let mystring = "";
  var stream = fs.createWriteStream("hierarchy.txt", { flags: "a" });
  console.log(new Date().toISOString());

  async function getChildren(id) {
    db(
      `SELECT * FROM parents WHERE progenitor_1 in (${id}) OR progenitor_2 in (${id});`
    ).then((results) => {
      console.log("Result of query 1:", results.data[0]);
      const { id } = results.data[0];
      db(`SELECT * FROM people WHERE couple_id in (${id});`).then((results) => {
        console.log("Result of query 2:", results);
        return results.data[0];
      });
    });
  }

  async function traverse(id) {
    let children = await getChildren(id);
    console.log("Here are the children: ", children);
    for (const child in children) {
      console.log("Inside for loop");
      stream.write(`{name: ${id}, children: [`);
      await traverse(child.id);
      stream.write(`]},` + "\n");
    }
  }
  //here is where we start the recursion
  traverse(id);
});

module.exports = router;
