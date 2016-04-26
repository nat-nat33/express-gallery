var express = require('express');
var router = express.Router();
var Gallery = require('../models').Gallery;
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/:id/edit', function (req, res){
  Gallery.findById(req.params.id).then(function (gallery) {
    res.json({success: true});
  });
});

router.get('/new', function (req, res) {
  res.json({success: true});
});

router.route('/:id')
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
  .post(function (req, res) {
    console.log('here', req.body);
    Gallery.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
    .then(function (obj) {
      console.log('success', obj);
      res.redirect('/');
    }).catch(function (err) {
      console.log('false', err);
      // res.json({success: false});
    });
  });



module.exports = router;