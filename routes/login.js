var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/')
  .get(function(req, res) {
    console.log('test');
    res.render('login');
  })
  .post(passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login',
  }));

module.exports = router;