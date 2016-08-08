var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
// var client = require('../'); //for connecting to SQL database

router.get('/', function(req, res, next) {
  res.send('we got here');
});

router.post('/', function(req, res, next) {
    // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.contentTextArea
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then( function(resolve, err){
    console.log('we hit the then');
    res.redirect(resolve.urlTitle)
  })
  .catch(function(error){
    console.log('we hit the catch');
    res.render('error', {error: error})
  });
  // -> after save -> res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:requestedURL', function(req, res, next){
  Page.findAll({
    where: { urlTitle: req.params.requestedURL}
  })
  .then(function(resolve,err){
    console.log(resolve);
    res.render('wikipage', resolve);
  })
  .catch(function(error){
    console.log('we hit the catch');
    res.render('error', {error: error})
  });
});



module.exports = router;
