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
router.get("/parents", function (req, res, next) {
  db(`SELECT * FROM parents;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

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

  db(
    `SELECT * FROM people LEFT JOIN parents on parents.id = couple_id WHERE id = ${id};`
  )
    .then((results) => {
      const person = results.data[0];
      db(
        `SELECT * FROM people WHERE id in (${person.progenitor_1},${person.progenitor_2} );`
      ).then((results) => {
        person.parents = results.data;
        res.send(person);
      });
    })
    // també ahuria de demanar dades de parents per o amb couple_id ja està?
    .catch((err) => res.status(500).send(err));
});

/* INSERT a new relative into the DB */
// router.post("/", function (req, res, next) {
//   const { firstName, lastName } = req.body;
//   db(
//     `INSERT INTO people (firstName, lastName) VALUES ("${firstName}", "${lastName}");`
//   )
//     .then(() => {
//       getFamily(req, res);
//     })
//     .catch((err) => res.status(500).send(err));
// });

/* INSERT new partner relationship */
router.post("/", function (req, res, next) {
  const { progenitor_1, progenitor_2, firstName, lastName } = req.body;
  // 1. Comprovar si hi ha una parella existent amb aquestes dades
  db(
    `SELECT * FROM parents WHERE (progenitor_1 = ${progenitor_1} AND progenitor_2 = ${progenitor_2}) OR (progenitor_1 = ${progenitor_2} AND progenitor_2 = ${progenitor_1}) ;`
  ).then((results) => {
    // 2. Si NO existeix (rebem un emtpy array)
    if (results.data.length === 0) {
      // res.send("no array");
      // 2.1 Creem una nova parella
      db(
        `INSERT INTO parents (progenitor_1, progenitor_2) VALUES ("${progenitor_1}", "${progenitor_2}");`
      )
        .then((results) => {
          res.send(results.data);
          // error "Cannot add or update a child row: a foreign key constraint fails (`mvp1`.`parents`, CONSTRAINT `parents_fk0` FOREIGN KEY (`progenitor_1`) REFERENCES `people` (`id`))"
        })
        .catch((err) => res.status(500).send(err));
      // 2.2 Busquem l'últim ID que s'ha insertat
      db(`SELECT id FROM parents ORDER BY id DESC limit 1;`)
        // Ho guardem en una variable couple_id
        .then((results) => {
          let couple_id = results.data.id;
        })
        .catch((err) => res.status(500).send(err));
    }
    // 3. Creem la nova persona
    db(
      `INSERT INTO people (firstName, lastName, couple_id) VALUES ("${firstName}", "${lastName}", ${couple_id});`
    ).catch((err) => res.status(500).send(err));
  });
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
