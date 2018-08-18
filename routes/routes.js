const express = require('express');
const router = express.Router();
const Routes = require('../models/routes')

router.get('/', (req, res, next) => {
  Routes.find({})
  .then((routes)=>{
  res.render('routes/index', { routes });
})
.catch((error)=>{
  next(error);
})
});

router.get('/new', (req, res, next) => {
  res.render('routes/new');
})

router.post('/new', (req, res, next) => {
  const { origen, destino, km, tiempo } = req.body;
  Routes.create({ origen, destino, km, tiempo })
    .then((data) => {
      res.redirect('/routes');
    })
    .catch(error => {
      next(error);
    })
})

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Routes.findById(id)
    .then((routes) => {
      res.render('routes/edit', routes);
    })
    .catch(error => {
      next(error);
    })
})

router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  const { origen , destino, } = req.body;
  Routes.findByIdAndUpdate(id, { origen, destino})
    .then((data) => {
      res.redirect('/routes');
    })
    .catch(error => {
      next(error);
    })
})
router.post('/:id/remove', (req, res, next) => {
  const { id } = req.params;
  Routes.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/routes')
    })
    .catch(error => {
      next(error);
    })
})

module.exports = router;