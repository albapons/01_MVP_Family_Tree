var express = require("express");
var router = express.Router();
// suuuuuper important!
const db = require("../model/helper");

/* GET a list of family members. */
router.get("/", function (req, res, next) {
  db(`SELECT * FROM people;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

function getFamily(req, res) {
  db(`SELECT * FROM people;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
}
router.get("/", getFamily);

/* GET the parents table. */
// router.get("/parents", function (req, res, next) {
//   db(`SELECT * FROM parents;`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// });

// /* No sé si fa falta */
// // function getParents(req, res) {
// //   db(`SELECT * FROM parents;`)
// //     .then((results) => {
// //       res.send(results.data);
// //     })
// //     .catch((err) => res.status(500).send(err));
// // }
// // router.get("/parents", getParents);

/* GET the family tree from 1 person. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;

  db(`SELECT * FROM people;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* INSERT a new relative into the DB */
router.post("/", function (req, res, next) {
  const { firstName, lastName } = req.body;
  db(
    `INSERT INTO people (firstName, lastName) VALUES ("${firstName}", "${lastName}");`
  )
    .then(() => {
      getFamily(req, res);
    })
    .catch((err) => res.status(500).send(err));
});

/* INSERT new partner relationship */
router.post("/:id", function (req, res, next) {
  const { id } = req.params;
  const { progenitor_1, progenitor_2 } = req.body;
  let couple = null;

  db(
    `INSERT INTO parents (progenitor_1, progenitor_2) VALUES ("${progenitor_1}", "${progenitor_2}");`
  )
    .then((results) => {
      couple = results.data[0];
      console.log(couple);
      // db(`UPDATE people SET couple_id = ${couple.}, WHERE id = ${id};`)
      //   .then((results) => {
      //     res.send(results.data);
      //   })
      //   .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));

  next();
});

/* DELETE one person */
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  let person = null;

  db(`SELECT * FROM people WHERE id = ${id}`)
    .then((results) => {
      person = results.data[0];

      db(`DELETE FROM people WHERE id = ${id};`)
        .then((results) => {
          res.send({
            msg: `${person.firstName} ${person.lastName} was deleted!`,
          });
        })
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});
module.exports = router;
