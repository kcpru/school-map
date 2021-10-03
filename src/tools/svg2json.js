const fs = require("fs");
const parseString = require("xml2js").parseString;

const path = "./src/assets/maps";

const args = process.argv.slice(2);

if (args[0]) {
  const input = args[0].split(".")[0],
    output = args[1] ? args[1].split(".")[0] : input;

  fs.readFile(`${path}/${input}.svg`, "utf-8", (err, data) => {
    parseString(data, function (err, result) {
      const jsonData = JSON.stringify(result);

      fs.writeFile(`${path}/${output}.json`, jsonData, (err) => {
        if (err) return console.log(err);
        console.log("The file was saved!");
      });
    });
  });
} else {
  console.log("Enter a file name");
}
