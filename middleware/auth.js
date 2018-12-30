const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');

async function ensureLoggedIn(req, res, next) {
  try {
    const tokenFromBody = req.body.token;
    jwt.verify(tokenFromBody, SECRET);
    next();
  } catch (e) {
    return next({ status: 401, message: "Unauthorized" });
  }
} 

async function ensureCorrectUser(req, res, next) {
  try {
    const tokenFromBody = req.body.token;
    const token = jwt.verify(tokenFromBody, SECRET);
    
    next();
  } catch (e) {
    return next({ status: 401, message: "Unauthorized" });
  }
} 

async function isAdmin(req, res, next) {
  if()
} 

module.exports = {
  isCorrectUser,
  isAdmin
}