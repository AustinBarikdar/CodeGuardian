import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 3000;
import { verifySignature } from './middleware/verifySignature.js';
import { handlePullRequestEvent } from './services/prHandler.js';

// Middleware to parse JSON body with raw buffer for signature verification
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// Webhook route
app.post('/webhook', verifySignature, (req, res) => {
  console.log('Event:', req.headers['x-github-event']);

  // TODO: Add PR handling logic here later
  handlePullRequestEvent(req.body) 

  // Respond to GitHub to acknowledge receipt of the webhook
  res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
