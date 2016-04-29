var express = require('express');
var passport = require('passport');
var router = express.Router();
// var bcrypt = require('bcrypt');
var User = require('../models').User;

// var saltRounds = 10;

var User = require('../models').User;

router.route('/')
  .get(function(req, res){
    res.render('register');
  })
  .post(function(req, res, next){
    var newUser = {
      username: req.body.username,
      password: req.body.password
    };

    User.findOne({where: { username: newUser.username}})
    .then(function(user) {
      console.log('tests!', user);
      if(user) {
        req.flash('error', 'User already exists, please Log In');
        return res.redirect('/register');
      } else {
        // bcrypt.hash(newUser.password, saltRounds, function(err, hash){
          User.create({
            username: newUser.username,
            password: newUser.password
          })
          .then(function(user){
            req.login(user, function(err) {
              if(err) {
                return next(err);
              }
              return res.redirect('/gallery');
            });
          });
        // });
      }
    });
  });
module.exports = router;