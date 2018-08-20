var express = require('express');
var router = express.Router();
const Trip = require('../models/trip');

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

// Post to save trip to db
router.post('/', function(req,res,next){
  
  const username = req.session.currentUser.email;
  var origin = req.body.origin;
  var destination = req.body.destination;
  var service = req.body.service;
  var cost = req.body.cost;

  Trip.create({ username, origin, destination, service, cost})
    .then(data => {
      res.redirect('/routes');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;