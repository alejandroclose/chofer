var express = require('express');
var router = express.Router();
const Trip = require('../models/trip');

const User = require('../models/user');

/* GET map page. */
router.get('/', function(req, res, next) {
  res.render('trips/trips', { title: 'Chofer Map' });
});

// Post to save trip to db
router.post('/', function(req,res,next){
  
  const username = req.session.currentUser.email;
  var origin = req.body.origin;
  var destination = req.body.destination;
  var service = req.body.service;
  var cost = req.body.cost;
  var time = req.body.time;
  var distance = req.body.distance;
  var name = req.body.name;
  

  Trip.create({ username, origin, destination, service, time, distance, cost,name})
    .then(data => {
      res.redirect('/routes');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;