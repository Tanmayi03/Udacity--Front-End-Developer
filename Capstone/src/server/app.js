const cors = require('cors');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();


let locationData = {};                   //This acts as endpoint to all routes

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

// Send all saved data
app.get('/data', (req, res) => {
  try {
    res.status(200).send(locationData);
  } catch (error) {
    console.error(JSON.stringify(error));
    res.status(500).send();
  }
});

app.post('/', (req, res) => {
  try {
    const { latitude, longitude, country, startDate } = req.body;

    if (!(latitude && longitude && country && startDate)) {
      throw new Error('They are required fields');
    }

    locationData = {
      latitude,
      longitude,
      country,
      startDate
    };

    res.status(200).send();
  } catch (error) {
    console.error(JSON.stringify(error));
    res.status(500).send(error);
  }
});

module.exports = app;