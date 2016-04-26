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
  Gallery.findAll()
  .then(function (gallery) {
     res.render('gallery', {
        galleries: gallery
     });

  }).catch(function (err) {
    res.json({success: false, error: err});
  });
});

app.use('/gallery', galleryRouter);

//jade templating
app.set('view engine', 'jade');
app.set('views', './views');



db.sequelize.sync().then(function () {
  app.listen(3000, function () {
    console.log('server running on port 3000');
  });
});