var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./models');
var Gallery = db.Gallery;
var galleryRouter = require('./routes/photos');
var loginRoute = require('./routes/login');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var CONFIG = require('./config/config.json');

app.set('view engine', 'jade');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: true}));
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
      return done(null, false);
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

app.use('/gallery', galleryRouter);
app.use('/login', loginRoute);

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

function isAuthenticated(req, res, next){
  console.log('here!', req.isAuthenticated());
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  return next();
}

app.get('/gallery', isAuthenticated, function(req, res){
  res.render('gallery');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

db.sequelize.sync().then(function () {
  app.listen(3000, function () {
    console.log('server running on port 3000');
  });
});