var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./models');
var Gallery = db.Gallery;

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(methodOverride(function (req, res){
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

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
    .then(function () {
      res.json(gallery);
    });
});



app.listen(3000, function() {
  db.sequelize.sync();
  console.log('connected to port 3000');
});