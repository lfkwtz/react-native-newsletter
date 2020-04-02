const axios = require("axios");
const fs = require("fs");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const repos = ["x"];

let output = "";

asyncForEach(repos, async element => {
  if (element !== "x") {
    let url = `https://api.github.com/repos/${element.split("com/")[1]}`;
    await axios.get(url).then(({ data }) => {
      output += `[${data.full_name}](${element})${
        data.description ? `: ${data.description}` : ""
      }\n\n`;
    });
  } else {
    fs.writeFile("output.md", output, err => {
      if (err) throw err;
      console.log("output saved!");
    });
  }
});
