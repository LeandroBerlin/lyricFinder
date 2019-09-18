// Read Synchrously the file
const fs = require("fs");
const content = fs.readFileSync("./lyrics.json");
// Parse JSON
const jsonContent = JSON.parse(content);

// The desired length of a text line
const lineLength = 23

// Filter and assign all the lines that match the length
const list23 = jsonContent.filter(line => (line['length'] >= lineLength ? line.text : ''))
console.log(list23)

// Random pick one of the lines
const randomLine = list23[Math.floor(Math.random() * list23['length'])]

// Console log
console.log(`-- This is a line with length ${lineLength} --`)
console.log(randomLine.text)
console.log(randomLine.type)