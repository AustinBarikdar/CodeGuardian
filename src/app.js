require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;
const {verifySignature} = require('./middleware/verifySignature');

// Middleware to parse JSON body with raw buffer for signature verification
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// Webhook route
app.post('/webhook', verifySignature, (req, res) => {ç
  console.log('Event:', req.headers['x-github-event']);

  // TODO: Add PR handling logic here later

  res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
