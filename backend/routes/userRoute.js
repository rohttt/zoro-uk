const express = require('express');
const rateLimit = require('express-rate-limit');
const { registerUser, loginUser } = require('../controllers/userController');
const { loginLimiter, signupLimiter } = require('../middleware/rateLimit');

const router = express.Router();

router.route('/user/signup').post(signupLimiter, registerUser) //Create new user
router.route('/user/login').post(loginLimiter, loginUser); // Login user

module.exports = router;

