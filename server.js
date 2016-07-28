const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DOCKER_DB = process.env.DB_PORT;
const MONGO_DB = DOCKER_DB
  ? DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/srv/express-mongo'
  : process.env.MONGODB;
const app = express();
const retry = 0;

mongoose.connect(MONGO_DB);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
