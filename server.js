var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./models');
var Gallery = db.Gallery;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/gallery', function (req, res) {
  Gallery.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
    })
  .then(function (gallery){
    res.json(gallery);
  });
});

app.get('/gallery', function (req, res) {
  Gallery.findAll()
    .then(function (gallery) {
      res.json(gallery);
    });
});

app.listen(3000, function() {
  db.sequelize.sync();
  console.log('connected to port 3000');
});