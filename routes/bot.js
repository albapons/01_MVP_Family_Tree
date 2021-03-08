var fs = require("fs");

let mystring = "This is a test";

//how to write to a file in one go
// fs.writeFile("Output.txt", mystring, (err) => {
//   // In case of a error throw err.
//   if (err) throw err;
// });

//how to append data to a file line by line
//from: https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node/43370201#43370201
var stream = fs.createWriteStream("hierarchy.txt", { flags: "a" });
console.log(new Date().toISOString());

[...Array(10000)].forEach(function (item, index) {
  stream.write(index + "\n");
});
console.log(new Date().toISOString());
//this is optional because the default i to auto close once the process is complete
stream.end();

//here is the code using append asynchronously:
//from: https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node
// fs.appendFile("message.txt", "data to append", function (err) {
//   if (err) throw err;
//   console.log("Saved!");
// });

//and synchronously from the same source
// fs.appendFileSync("message.txt", "data to append");
