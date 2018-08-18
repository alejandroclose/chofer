var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('routes', { title: 'Your Routes' });
  });


module.exports = router;