require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "facebook",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = `DROP TABLE parents; DROP TABLE people; CREATE TABLE people (id int NOT NULL AUTO_INCREMENT,firstName varchar(255),lastName varchar(255),couple_id int,PRIMARY KEY (id));CREATE TABLE parents (id int NOT NULL AUTO_INCREMENT, progenitor_1 int, progenitor_2 int, PRIMARY KEY (id)); INSERT INTO people (firstName, lastName) VALUES ("Dolors", "Lloret Ribalta"), ("Jesús", "Pons Català"); INSERT INTO parents (progenitor_1, progenitor_2) VALUES ("1", "2"); INSERT INTO people (firstName, lastName, couple_id) VALUES ("Alba", "Pons Lloret", 1);`;
  //  "ALTER TABLE parents ADD CONSTRAINT parents_fk0 FOREIGN KEY (people_id) REFERENCES people(id); ALTER TABLE parents ADD CONSTRAINT parents_fk1 FOREIGN KEY (progenitor_1) REFERENCES people(id); ALTER TABLE parents ADD CONSTRAINT parents_fk2 FOREIGN KEY (progenitor_2) REFERENCES people(id);";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `students` was successful!");

    console.log("Closing...");
  });

  con.end();
});
