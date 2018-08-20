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
  
  const user = req.session.currentUser.email;
  const { price, origin, destination, service } = req.body;

  Trip.create({ user, origin, destination, service, price})
    .then(data => {
      res.redirect('/routes');
    })
    .catch(error => {
      next(error);
    })
  
});

module.exports = router;