const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const validateJSONSchema = require('../middleware/validateJSONSchema');
const registerSchema = require('../schema/registerSchema');

/**
 * GET / => {users: [{}]}
 */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.getAll();
    return res.json({users});
  } catch (err) {
    return next(err);
  }
});

/**
 * POST / => {user: {}}
 */
router.post('/', validateJSONSchema(registerSchema), async function(req, res, next) {
  try {
    const user = await User.create(req.body);
    return res.json({user});
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /:username => {user: {}}
 */
router.get('/:username', async function(req, res, next) {
  try {
    const username = req.params.username;
    const user = await User.get(username);
    return res.json({user});
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH /:username => {user: {}}
 */
router.patch('/:username', async function(req, res, next) {
  try {
    const user = await User.edit();
    return res.json({user});
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /:username => {users: [{}]}
 */
router.get('/:username', async function(req, res, next) {
  try {
    const user = await User.remove();
    return res.json({user});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;