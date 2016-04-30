var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/')
  .get(function(req, res) {
    res.render('login', {errorMessage: req.flash('error')[0]});
  })
  .post(passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login',
    failureFlash: true
  }));

module.exports = router;