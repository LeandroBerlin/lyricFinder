const fs = require("fs");
const express = require('express')
const app = express()
const cors = require('cors')


searchString = (req, res) => {
    // Read Synchrously the file
    const content = fs.readFileSync("./lyrics.json");
    // Parse JSON
    const jsonContent = JSON.parse(content);
    // The desired length of a text line
    const lineLength = req.params.stringLength ? req.params.stringLength : 23;

    // Filter and assign all the lines that match the length
    const list23 = jsonContent.filter(line => (line.lengthOfLine >= lineLength ? line.text : ''))
    console.log(list23)

    // Random pick one of the lines
    const randomLine = list23[Math.floor(Math.random() * list23.length)]

    // Console log
    // console.log(`-- This is a line with length ${lineLength} --`)
    // console.log(randomLine.text)
    // console.log(randomLine.type)

    //Response
    randomLine ?
        res.json({ requested_length: lineLength, string: randomLine.text, length: randomLine.lengthOfLine })
        :
        res.json({ msg: 'nothing with this length' })

}


app.get('/:stringLength?', cors(), searchString)




const server = app.listen(3000, () => {
    console.log('Listening on port %s', server.address().port)
})