// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());

let currentTemperature = 72; // default temp
let currentStatus = "closed"; // default

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to return current temperature
app.get('/temperature', (req, res) => {
  res.json({ temperature: currentTemperature });
});

// POST endpoint to update temperature
app.post('/temperature', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    currentTemperature = value;
    res.json({ success: true, message: `Temperature updated to ${value}` });
  } else {
    res.status(400).json({ success: false, message: 'Invalid temperature value' });
  }
});

// GET current status
app.get('/status', (req, res) => {
  res.json({ status: currentStatus });
});

// POST to update status
app.post('/status', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'string' && (value === 'open' || value === 'closed')) {
    currentStatus = value;
    res.json({ success: true, message: `Status updated to ${value}` });
  } else {
    res.status(400).json({ success: false, message: 'Invalid status' });
  }
});


app.listen(port, () => {
    console.log(`Temperature API listening on port ${port}`);
});
  
app.get('/privacy', (req, res) => {
  res.send(`
    <html>
      <head><title>Privacy Policy</title></head>
      <body>
        <h1>Privacy Policy</h1>
        <p>This app does not collect or store any personal data.</p>
        <p>All pool status and temperature data is controlled and sent by administrators only.</p>
      </body>
    </html>
  `);
});

