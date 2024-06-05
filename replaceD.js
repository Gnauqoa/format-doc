const fs = require("fs");

const inputFile = "./raw_clean.txt";
const outputFile = "./raw_clean_duc.txt";

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const modifiedContent = data.replace("Đức", "Đức");

  fs.writeFile(outputFile, modifiedContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }

    console.log("File saved successfully!");
  });
});
