const cors = require('cors');
const bodyParser = require('body-parser');
const aylien = require('aylien_textapi');
const dotenv = require('dotenv');

// Import and parse dotenv configuration
const result = dotenv.config();

if (result.error) {
    throw result.error;
}

const express = require('express');
const app = express();

// Set aylien API credentials
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})



app.post('/analyze/', async (req, res) => {
    textapi.sentiment({ url: req.body.url, mode: 'document' }, (error, result, remaining) => {
        if (error) {
            console.error(JSON.stringify(error))
            console.log(error)
        } 
        else {
            res.status(200).send(result)
        }
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})