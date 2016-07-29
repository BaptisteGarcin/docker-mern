const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DOCKER_DB = process.env.MONGO_DB;
const app = express();

mongoose.connect('mongodb://db:27017/express-mongo');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
