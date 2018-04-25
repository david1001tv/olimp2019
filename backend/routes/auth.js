const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const app = require('./../main.js');
const config = require('./../config');
const {
  registerValidator,
  register,
  googleRegisterValidator,
  googleRegister,
  login,
  loginValidator,
  googleLogin,
  googleLoginValidator,
} = require('../controllers/auth');

/*
 /api/auth/
 */

router.post('/register', registerValidator, register);

router.post('/google-register', googleRegisterValidator, googleRegister);

router.post('/login', loginValidator, login);

router.post('/google-login', googleLoginValidator, googleLogin);

module.exports = router;
