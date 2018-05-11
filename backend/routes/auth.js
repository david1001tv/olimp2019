const express = require('express');

const router = express.Router();
const {
    registerValidator,
    register,
} = require('../controllers/auth/register');

const {
  googleRegisterValidator,
  googleRegister,
} = require('../controllers/auth/googleRegister');

const {
  login,
  loginValidator,
} = require('../controllers/auth/login');

const {
  googleLogin,
  googleLoginValidator,
} = require('../controllers/auth/googleLogin');

/*
 /api/auth/
 */

router.post('/register', registerValidator, register);

router.post('/google-register', googleRegisterValidator, googleRegister);

router.post('/login', loginValidator, login);

router.post('/google-login', googleLoginValidator, googleLogin);

module.exports = router;
