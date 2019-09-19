const fs = require("fs");
const express = require('express')
const app = express()
const cors = require('cors')


searchString = (req, res) => {
    // Read Synchrously the file
    const content = fs.readFileSync("./lyrics.json");
    // Parse JSON
    const jsonContent = JSON.parse(content);
    // The desired length of a text line and number of lines
    const lineLengthMin = req.params.stringLengthMin ? req.params.stringLengthMin : 10;
    const lineLengthMax = req.params.stringLengthMax ? req.params.stringLengthMax : 60;
    const numberLines = req.params.numberLines ? req.params.numberLines : 12;
    // Filter and assign all the lines that match the length + flat the array
    const listOfLyrics = jsonContent.map(lyric =>
        lyric.filter(line => (line.lengthOfLine >= lineLengthMin && lineLengthMax ? line.text : ''))
    ).flat()

    // Random select n lines
    const selectLyrics = getRandomLines(listOfLyrics, numberLines)
    // Check if we have an array otherweise response with error
    if (selectLyrics instanceof Array) {
        const lyrics = selectLyrics.map(randomLine => {
            var lyric = {
                requested_length: lineLengthMin + ' / ' + lineLengthMax, string: randomLine.text, length: randomLine.lengthOfLine
            }
            return lyric;
        })

        res.json(lyrics)

    } else {
        res.json({ error: selectLyrics, requested_length: lineLengthMin + ' / ' + lineLengthMax, })
    }
    //End of SearchString
}

// Get random items from an array
const getRandomLines = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        return ("No lyrics with the selected parameters");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}


// Express

app.get('/:stringLengthMin?/:stringLengthMax?/:numberLines?', cors(), searchString)

const server = app.listen(4000, () => {
    console.log('Listening on port %s', server.address().port)
})