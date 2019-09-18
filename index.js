const express = require('express')
const app = express()


searchString = (req, res) => {
    // Read Synchrously the file
    const fs = require("fs");
    const content = fs.readFileSync("./lyrics.json");
    // Parse JSON
    const jsonContent = JSON.parse(content);

    // The desired length of a text line
    const lineLength = req.params.stringLength ? req.params.stringLength : 23;

    // Filter and assign all the lines that match the length
    const list23 = jsonContent.filter(line => (line['length'] >= lineLength ? line.text : ''))
    console.log(list23)

    // Random pick one of the lines
    const randomLine = list23[Math.floor(Math.random() * list23['length'])]

    // Console log
    // console.log(`-- This is a line with length ${lineLength} --`)
    // console.log(randomLine.text)
    // console.log(randomLine.type)
    if (randomLine)
        res.json({ length: lineLength, string: randomLine.text })
    else
        res.json({ msg: 'nothing with this length' })

}


app.get('/:stringLength?', searchString)




const server = app.listen(3000, () => {
    console.log('Listening on port %s', server.address().port)
})