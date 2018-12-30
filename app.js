const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const cors = require('cors');

app.use(express.json());

app.use(cors());


//routes middleware
app.use('/login', loginRoutes);
app.use('/users', userRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;