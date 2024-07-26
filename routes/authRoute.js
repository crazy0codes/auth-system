const express = require('express');
const { login, register, getProfile } = require('../controllers/authController');
const verifyUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/user/profile', verifyUser, getProfile);

module.exports = router