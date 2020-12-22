const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const passport     = require('passport');
const session      = require('express-session');
const mysql        = require('mysql');

 // require routes
const index = require('./routes/index');
const inventario = require('./routes/inventario');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport and Sessions set up
app.use(session({
  secret: 'corDragCra2020',
  resave: false,
  saveUninitialized: true
}));
// estos hasta tener la base de datos y el modelo de user
// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// Mount routes
app.use('/', index);
app.use('/inventario', inventario);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
