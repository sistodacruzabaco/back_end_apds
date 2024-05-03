const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {requireAuth, checkUser} = require('../middleware/authMiddleware')

// GET /login
router.get('/login', checkUser, authController.get_login);

// POST /login
router.post('/login', authController.post_login);

// GET /logout
router.get('/logout', requireAuth, authController.get_logout);

module.exports = router;