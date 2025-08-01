const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

function verifySignature(req, res, next) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) {
    return res.status(401).send('No signature found');
  }
  const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
  const digest = 'sha256=' + hmac.update(req.rawBody).digest('hex');
  if (signature !== digest) {
    return res.status(401).send('Invalid signature');
  }
  next();

  print('Signature verified successfully');
}

module.exports = {verifySignature};