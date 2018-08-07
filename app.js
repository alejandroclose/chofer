const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require('connect-flash');

const dbName = 'chofer';
mongoose.connect(`mongodb://localhost/${dbName}`);


const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const tripsRouter = require('./routes/trips');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'chofer',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/trips', (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    req.flash('info', 'tienes que logearte');
    res.redirect('/auth/login');
  }
}, tripsRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page 404
  res.status(err.status);
  res.render('error-404');

  // render the error page 500
  res.status (500);
  res.render('error-500');
});

module.exports = app;
