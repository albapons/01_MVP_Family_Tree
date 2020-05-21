var express = require("express");
var router = express.Router();

/* GET family listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// /* GET the family tree. */

/* GET a list of family members. */
router.get("/", function (req, res, next) {
  db(`SELECT * FROM people;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// function getFamily(req, res) {
//   db(`SELECT * FROM people;`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => res.status(500).send(err));
// }
// router.get("/", getFamily);

// // /* INSERT a new relative into the DB */
// router.post("/", function (req, res, next) {
//   const { firstName, lastName, partner } = req.body;
//   db(
//     `INSERT INTO people (firstName, lastName) VALUES ("${firstName}", "${lastName}", "${partner}")`
//   )
//     .then(() => {
//       getStudents(req, res);
//     })
//     .catch((err) => res.status(500).send(err));
// });

// /* INSERT new partner relationship */
// router.post("/", function (req, res, next) {
//   const { firstName, lastName, partner } = req.body;
//   db(
//     `INSERT INTO parent (firstName, lastName) VALUES ("${firstName}", "${lastName}", "${partner}")`
//   )
//     .then(() => {
//       getStudents(req, res);
//     })
//     .catch((err) => res.status(500).send(err));
// });

/* INSERT a new relative into the DB */

module.exports = router;
