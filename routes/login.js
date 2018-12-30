const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const validateJSONSchema = require('../middleware/validateJSONSchema');
const loginSchema = require('../schema/loginSchema');

/**
 * post / => {users: [{}]}
 */
router.post('/', validateJSONSchema(loginSchema), async function(req, res, next) {
  try {
    const result = await User.login(req.body);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;