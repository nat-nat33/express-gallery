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
   .get(function (req, res) {
    Gallery.findAll()
    .then(function (photos) {
      var photo;
      for(var i = 0; i < photos.length; i++) {
        if(photos[i].id.toString() === req.params.id) {
          photo = photos.splice(i, 1)[0];
          break;
        }
      }
      if(!photo) {
        console.log("test");
        return res.json({success: false});
      }
      res.render('photo', {
          photo: photo,
          photos: photos.slice(0,3)
       });
    })
    .catch(function (err) {
      console.log("blahblah");
      res.json({success : false, err: err});
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
    }).then(function (photo) {

      if(!photo) {
        return next({status: 404, message: 'Photo not Found'});
      }

     res.redirect('/gallery/' + req.params.id);
    }).catch(function (err) {
      return next({status: 500, message: 'Error Finding Photo'});
    });
  })
  .delete(function (req, res) {
    console.log('here', req.body);
    Gallery.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (photo) {
      if(!photo) {
        return next({status: 404, message: 'Photo not Found'});
      }
      return res.redirect('/gallery');
    }).catch(function (err) {
      return next({status: 500, message: 'Error Finding Photo'});
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