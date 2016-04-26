var express = require('express');
var router = express.Router();
var Gallery = require('../models').Gallery;

router.get('/gallery/:id/edit', function (req, res){
  Gallery.findById(req.params.id).then(function (gallery) {
    res.json({success: true});
  });
});

router.get('/gallery/new', function (req, res) {
  res.json({success: true});
});

router.route('/gallery/:id')
  .get(function (req, res){
    Gallery.findById(req.params.id).then(function () {
      res.json({success: true});
    });
  })
  .put(function (req, res) {
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
    Gallery.destory({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.json({success: true});
    });
  });


router.route('/')
  .get(function (req, res) {
    Gallery.findAll()
    .then(function (gallery) {
       res.render('gallery', {
          gallery: gallery
       });

    }).catch(function (err) {
      res.json({success: false, error: err});
    });
  })
  .post(function (req, res) {
    Gallery.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
    .then(function () {
      res.redirect('/gallery');
    }).catch(function (err) {
      res.json({success: false});
    });
  });

module.exports = router;