var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./models');

app.listen(3000, function() {
  db.sequelize.sync();
  console.log('connected to port 3000');
});