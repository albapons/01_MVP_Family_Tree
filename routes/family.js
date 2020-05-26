var express = require("express");
var router = express.Router();
// suuuuuper important!
const db = require("../model/helper");

/* GET a list of family members. */
router.get("/", function (req, res, next) {
  db(`SELECT * FROM people ORDER BY lastName ASC;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* GET the family tree from 1 person. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;

  db(
    `SELECT * FROM people LEFT JOIN parents on parents.id = couple_id WHERE people.id = ${id};`
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
    .catch((err) => res.status(500).send(err));
});

/* POST new partner relationship */
router.post("/", function (req, res, next) {
  const { progenitor_1, progenitor_2, firstName, lastName } = req.body;
  // 0. Comprovar si hem insertat progenitors
  // 0A Si NO hem insertat progenitors crear persona sense progenitors
  if (!progenitor_1 && !progenitor_2) {
    db(
      `INSERT INTO people (firstName, lastName) VALUES ("${firstName}", "${lastName}");`
    )
      .then((results) =>
        res.send({
          msg: `${firstName} ${lastName} added without progenitors.`,
        })
      )
      .catch((err) => res.status(500).send(err));
  } else if (progenitor_1 && !progenitor_2) {
    // 0B Si hem insertat NOMÉS 1 progenitor crear una persona amb només un progenitor.
    db(`INSERT INTO parents (progenitor_1) VALUES ("${progenitor_1}");`)
      .then((results) => {
        // 2.2 Busquem l'últim ID que s'ha insertat
        db(`SELECT id FROM parents ORDER BY id DESC limit 1;`)
          // Ho guardem en una variable couple_id
          .then((results) => {
            let couple_id = results.data[0].id;
            // 3. Creem la nova persona
            db(
              `INSERT INTO people (firstName, lastName, couple_id) VALUES ("${firstName}", "${lastName}", ${couple_id});`
            )
              .then((results) =>
                res.send({
                  msg: `${firstName} ${lastName} added with one progenitor (${progenitor_1}).`,
                })
              )
              .catch((err) => res.status(500).send(err));
          })
          .catch((err) => res.status(500).send(err));
      })
      .catch((err) => res.status(500).send(err));
  } else {
    // 0C Si hem insertat 2 progenitors saltar a 1
    // 1. Comprovar si hi ha una parella existent amb aquestes dades
    db(
      `SELECT * FROM parents WHERE (progenitor_1 = ${progenitor_1} AND progenitor_2 = ${progenitor_2}) OR (progenitor_1 = ${progenitor_2} AND progenitor_2 = ${progenitor_1}) ;`
    ).then((results) => {
      // 2. Si NO existeix (rebem un emtpy array)
      if (results.data.length === 0) {
        console.log("This couple doesn't exist!");
        // 2.1 Creem una nova parella
        db(
          `INSERT INTO parents (progenitor_1, progenitor_2) VALUES ("${progenitor_1}", "${progenitor_2}");`
        )
          .then((results) => {
            // 2.2 Busquem l'últim ID que s'ha insertat
            db(`SELECT id FROM parents ORDER BY id DESC limit 1;`)
              // Ho guardem en una variable couple_id
              .then((results) => {
                let couple_id = results.data[0].id;
                // 3. Creem la nova persona
                db(
                  `INSERT INTO people (firstName, lastName, couple_id) VALUES ("${firstName}", "${lastName}", ${couple_id});`
                )
                  .then((results) =>
                    res.send({
                      msg: `${firstName} ${lastName} added with 2 progenitors (${progenitor_1} and ${progenitor_2}).`,
                    })
                  )
                  .catch((err) => res.status(500).send(err));
              })
              .catch((err) => res.status(500).send(err));
          })
          .catch((err) => res.status(500).send(err));
      } else {
        let couple_id = results.data[0].id;
        console.log("This couple exist!", couple_id);
        db(
          `INSERT INTO people (firstName, lastName, couple_id) VALUES ("${firstName}", "${lastName}", ${couple_id});`
        )
          .then((results) =>
            res.send({
              msg: `${firstName} ${lastName} added with 2 progenitors (${progenitor_1} and ${progenitor_2}).`,
            })
          )
          .catch((err) => res.status(500).send(err));
      }
    });
  }
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

/* No sé si fa falta */
// function getFamily(req, res) {
//   db(`SELECT * FROM people;`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// }
// router.get("/", getFamily);

/* No sé si fa falta */
/* GET the parents table. */
// router.get("/parents", function (req, res, next) {
//   db(`SELECT * FROM parents;`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// });

/* No sé si fa falta */
// function getParents(req, res) {
//   db(`SELECT * FROM parents;`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// }
// router.get("/parents", getParents);
module.exports = router;
