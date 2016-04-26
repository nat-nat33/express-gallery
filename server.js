var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var db = require('./models');
var Gallery = db.Gallery;
var galleryRouter = require('./routes/photos');


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.json({success: true});
});

app.use('/photos', galleryRouter);

//jade templating
app.set('view engine', 'jade');
app.set('views', './views');


app.listen(3000, function() {
  db.sequelize.sync();
  console.log('connected to port 3000');
});