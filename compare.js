const readline = require("readline");
const fs = require("fs"); // Using synchronous file system operations

// const doc = new docx.Document();
function compareSentences(sentence1, sentence2) {
  const words1 = sentence1.split(" ");
  const words2 = sentence2.split(" ");
  let diff = false;

  str1 = "";
  str2 = "";
  for (let i = 0; i < Math.max(words1.length, words2.length); i++) {
    const word1 = words1[i] || "";
    const word2 = words2[i] || "";
    if (word1 !== word2) {
      diff = true;
      str1 += `<span style="color: red;">${word1}</span> `;
      str2 += `<span style="color: red;">${word2}</span> `;
    } else {
      str1 += `${word1} `;
      str2 += `${word2} `;
    }
  }
  str1 = `<p>AI: ${str1}</p>`;
  str2 = `<p>Original: ${str2}</p>`;
  return [str1, str2, diff];
}
async function alternateLines(file1, file2, outputFile) {
  const lines1 = [];
  const rl1 = readline.createInterface({
    input: fs.createReadStream(file1),
    crlfDelay: Infinity,
  });
  for await (const line of rl1) {
    lines1.push(line);
  }
  const rl2 = readline.createInterface({
    input: fs.createReadStream(file2),
    crlfDelay: Infinity,
  });
  let currentLine = 0;
  fs.writeFileSync(outputFile, "");
  for await (const line of rl2) {
    const t_file1 = lines1[currentLine];
    const t_file2 = line;
    const diffs = compareSentences(t_file1, t_file2);
    if (diffs[2] === true) {
      fs.appendFileSync(
        outputFile,
        `<p>************** Dòng ${currentLine + 1}******************</p>`
      );
      fs.appendFileSync(outputFile, diffs[0]);
      fs.appendFileSync(outputFile, diffs[1]);
    }
    ++currentLine;
    if (currentLine === 2613) {
      return;
    }
  }
}

// Replace with your actual file paths
const file1 = "correct_clean.txt";
const file2 = "raw_clean.txt";
const outputFile = "result.html";

alternateLines(file1, file2, outputFile);

console.log(
  `Lines copied alternately from ${file1} and ${file2} to ${outputFile}`
);
