var express = require("express");
var router = express.Router();
var fs = require('fs');
// suuuuuper important!
const db = require("../model/helper");

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  let mystring = "";
  let traverse  =  (id) => {
  db(
    `SELECT * FROM parents WHERE progenitor_1 in (${id}) OR progenitor_2 in (${id});`
  )
    .then((results) => {
        console.log("Result of query 1:", results.data[0]);
      const { id } = results.data[0];
      db(
        `SELECT * FROM people WHERE couple_id in (${id});`
      ).then((results) => { 
          console.log("Result of query 2:", results);
          for(const record of results.data[0]){
          mystring += `{name: ${id}, children: [${traverse(record.id)}]`}});
          console.log(mystring);
    
        })
    .catch(mystring += `{name: ${id}, value: 0.5}`);};
    traverse(id);
    console.log(mystring);
    // Write data in 'Output.txt' . 
fs.writeFile('Output.txt', mystring, (err) => { 
    // In case of a error throw err. 
    if (err) throw err; 
}) 
}

module.exports = router;
