// server.js
const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = 3000;

// Serve the secret from environment variables
app.get('/getSecret', (req, res) => {
  const TOKEN = process.env.TOKEN;
  const SITE_PASSWORD = process.env.SITE_PASSWORD;

  if (!TOKEN || !SITE_PASSWORD) {
    return res.status(500).json({ error: 'Secrets not found' });
  }

  // Send the secret in the response
  res.json({
    TOKEN: TOKEN,
    SITE_PASSWORD: SITE_PASSWORD
   });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});