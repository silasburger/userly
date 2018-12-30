const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');

async function ensureLoggedIn(req, res, next) {
  try {
    const tokenFromBody = req.body.token;
    const _token = jwt.verify(tokenFromBody, SECRET);
    req.username = _token.username;
    next();
  } catch (e) {
    return next({ status: 401, message: "Unauthorized" });
  }
} 

async function ensureCorrectUser(req, res, next) {
  try {
    const tokenFromBody = req.body.token;
    const _token = jwt.verify(tokenFromBody, SECRET);
    if(_token.username === req.params.username) {
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    return next({ status: 401, message: "Unauthorized" });
  }
} 

module.exports = {
  ensureLoggedIn,
  ensureCorrectUser,
}