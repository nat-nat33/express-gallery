var express = require('express');
var app = express();
//passports
var passport = require('passport');

var session = require('express-session');

var localStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var db = require('./models');
var Gallery = db.Gallery;
var galleryRouter = require('./routes/photos');

var CONFIG = require('./config/config.json');

app.use(session({
  resave: true,
  saveUnintialized: true,
  secret: CONFIG.session_auth.secret_session_key
}));

app.use(express.static('./public'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(
  function(username, password, done){
    var USERNAME = CONFIG.session_auth.username;
    var PASSWORD = CONFIG.session_auth.password;

    if (!(username === USERNAME && password === PASSWORD)){
      return done(null, user);
    }
    var user = {
      name: USERNAME
    };
    return done(null, user);
}));

passport.serializeUser(function(user, done){
  return done(null, user);
});

passport.deserializeUser(function(user, done){
  return done(null, user);
});

//jade templating
app.set('view engine', 'jade');
app.set('views', './views');

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

app.get('/login', function(req, res){
  res.render('login');
});



db.sequelize.sync().then(function () {
  app.listen(3000, function () {
    console.log('server running on port 3000');
  });
});