const express = require('express');
const router = express.Router();
const Trip = require('../models/trip')

router.get('/', (req, res, next) => {
  Trip.find({})
  .then((trips)=>{
  res.render('routes/index', { trips });
})
.catch((error)=>{
  next(error);
})
});

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Trip.findById(id)
    .then((trips) => {
      console.log(trips);
      res.render('routes/edit', trips);
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