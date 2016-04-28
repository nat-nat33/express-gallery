var express = require('express');
var router = express.Router();
var Gallery = require('../models').Gallery;
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/:id/edit', function (req, res){
  Gallery.findById(req.params.id).then(function (gallery) {
    res.render('edit', {gallery: gallery});
  });
});

router.get('/new', function (req, res) {
  res.render('new');
});

router.route('/:id')
  .get(function (req, res){
    Gallery.findById(req.params.id).then(function () {
      res.json({success: true});
    });
  })
  .put(function (req, res) {
    console.log('req.body', req.body);
    Gallery.update({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    }, {
      where: {
        id : req.params.id
      }
    }).then(function () {
      res.json({success: true});
    });
  })
  .delete(function (req, res) {
    console.log('here', req.body);
    Gallery.destroy({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.json({success: true, redirect: '/gallery'});
    });
  });

router.route('/')
  .post(function (req, res) {
    Gallery.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
    .then(function () {
      res.redirect('/');
    }).catch(function (err) {
        res.json({success: false});
    });
  });

module.exports = router;