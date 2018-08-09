const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;

const User = require('../models/user');

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const { name, password ,email} = req.body;

  if ( !username || !password || !email) {
    res.render('signup', { message: 'No deje campos vacios'});
  } else {
    User.findOne({ username })
      .then(user => {
        if (user) {
          res.render('signup', { message: 'Usuario o contraseña ya existen' });
        } else {
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(password, salt);
          User.create({
            username,
            email,
            password: hashedPassword
          })
          .then(newUser => {
            res.redirect('/trips')
          })
          .catch(error => {
            next(error);
          })
        }
      })
      .catch(error => {
        next(error);
      })
  }
})

router.get('/login', (req, res, next) => {
  const data = {
    messages: req.flash('info')
  };
  res.render('login', data );
})

router.post('/login', (req, res, next) => {
  const {  password, email } = req.body;
  if (  !password || !email) {
    req.flash('info', 'No deje campos vacios');
    res.redirect('/auth/login')
  } else {
    User.findOne({ email })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.redirect('/trips');
          } else {
            req.flash('info', 'Username o password incorrectos');
            res.redirect('/auth/login')
          }
        } else {
          req.flash('info', 'Username o password incorrectos');
          res.redirect('/auth/login')
        }
      })
      .catch(error => {
        next(error);
      })
  }
})

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser
  res.redirect('/');
})

module.exports = router;