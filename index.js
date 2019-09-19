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
    const lineLengthMin = req.params.stringLengthMin ? req.params.stringLengthMin : 10;
    const lineLengthMax = req.params.stringLengthMax ? req.params.stringLengthMax : 60;
    const numberLines = req.params.numberLines ? req.params.numberLines : 12;
    // Filter and assign all the lines that match the length + flat to single array
    const list23 = jsonContent.map(lyric =>
        lyric.filter(line => (line.lengthOfLine >= lineLengthMin && lineLengthMax ? line.text : ''))
    ).flat()


    const getRandomLyrics = (arr, n) => {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandomLyrics: more elements requested than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    const selectLyrics = randomLyrics(list23, numberLines)

    const lyrics = selectLyrics.map(randomLine => {


        var lyric = {
            requested_length: lineLengthMin + ' / ' + lineLengthMax, string: randomLine.text, length: randomLine.lengthOfLine
        }
        return lyric;
    })

    // Console log
    // console.log(`-- This is a line with length ${lineLength} --`)
    // console.log(randomLine.text)
    // console.log(randomLine.type)

    //Response
    lyrics ?
        res.json(lyrics)
        :
        res.json({ msg: 'nothing with this length' })

}


app.get('/:stringLengthMin?/:stringLengthMax?/:numberLines?', cors(), searchString)




const server = app.listen(4000, () => {
    console.log('Listening on port %s', server.address().port)
})