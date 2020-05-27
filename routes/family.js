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
  // 0. Check if we have inserted parents
  // 0A If we have NOT inserted parents create person without parents
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
    // 0B If we have inserted ONLY 1 parent create a person with only one parent.
    db(`INSERT INTO parents (progenitor_1) VALUES ("${progenitor_1}");`)
      .then((results) => {
        // 0B.1 We look for the last ID that was inserted
        db(`SELECT id FROM parents ORDER BY id DESC limit 1;`)
          // Save it in a variable couple_id
          .then((results) => {
            let couple_id = results.data[0].id;
            // 0B.2. We create the new person
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
    // 0C If we have inserted 2 parents jump to 1
    // 1. Check if there is an existing pair with this data
    db(
      `SELECT * FROM parents WHERE (progenitor_1 = ${progenitor_1} AND progenitor_2 = ${progenitor_2}) OR (progenitor_1 = ${progenitor_2} AND progenitor_2 = ${progenitor_1}) ;`
    ).then((results) => {
      // 1.1. If it does NOT exist (we receive an empty array)
      if (results.data.length === 0) {
        console.log("This couple doesn't exist!");
        // 1.1.1 We create a new couple
        db(
          `INSERT INTO parents (progenitor_1, progenitor_2) VALUES ("${progenitor_1}", "${progenitor_2}");`
        )
          .then((results) => {
            // 1.1.2 We look for the last ID that was inserted
            db(`SELECT id FROM parents ORDER BY id DESC limit 1;`)
              // Save it in a variable couple_id
              .then((results) => {
                let couple_id = results.data[0].id;
                // 1.1.3. We create the new person
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
        // 1.2. If it exist (we receive an empty array)

        let couple_id = results.data[0].id;
        console.log("This couple exist!", couple_id);
        // 1.2.1 We create the new person
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

/* I don't know if it's necessary */
// function getFamily(req, res) {
//   db(`SELECT * FROM people;`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// }
// router.get("/", getFamily);

/* I don't know if it's necessary */
/* GET the parents table. */
// router.get("/parents", function (req, res, next) {
//   db(`SELECT * FROM parents;`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// });

/* I don't know if it's necessary */
// function getParents(req, res) {
//   db(`SELECT * FROM parents;`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// }
// router.get("/parents", getParents);
module.exports = router;
