var fs = require("fs");

let mystring = "This is a test";

fs.writeFile("Output.txt", mystring, (err) => {
  // In case of a error throw err.
  if (err) throw err;
});
