var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* GET map page. */
router.get('/', function(req, res, next) {
  res.render('trips/trips', { title: 'Chofer Map' });
});

router.get('/taxi', function(req, res, next) {
  res.render('trips/taxi', { title: 'Taxi' });
});

router.get('/uber', function(req, res, next) {
  res.render('trips/uber', { title: 'Uber' });
});

router.get('/cabify', function(req, res, next) {
  res.render('trips/cabify', { title: 'Cabify' });
});

router.post('/', function(req,res,next){
  console.log(req.body);
  res.redirect('/routes');
});

module.exports = router;

