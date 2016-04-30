var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');

var db = require('./models');
var User = db.User;
var Gallery = db.Gallery;
var galleryRouter = require('./routes/photos');
var loginRoute = require('./routes/login');
var registerRoute = require('./routes/register');
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
app.use(flash());

passport.use(new localStrategy(function (username, password, done) {
  User.findOne({where: {username: username}})
  .then(function (user) {
    if(!user) {
      return done(null, false, {message: "User not found"});
    }
    bcrypt.compare(password, user.password, function (err, res) {
      if(res === true) {
        return done(null, user);
      } else {
        return done(null, false, {message: "Invalid password"});
      }
    });
  })
  .catch(function (err) {
    return done(err);
  });
}));

passport.serializeUser(function(user, done){
  return done(null, user);
});

passport.deserializeUser(function(user, done){
  return done(null, user);
});

app.use('/gallery', galleryRouter);
app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.get(/\/(gallery)?/, function (req, res) {
  Gallery.findAll()
  .then(function (gallery) {
    res.render('gallery', {
        galleries: gallery,
        loggedIn: req.user
     });
  }).catch(function (err) {
    res.json({success: false, error: err});
  });
});

function isAuthenticated(req, res, next){
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