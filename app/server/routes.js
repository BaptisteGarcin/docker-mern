const express = require('express');

const app = express.Router();

app.get('/api', (req, res) => {
  res.json({ hello: 'world' });
});

module.exports = app;
