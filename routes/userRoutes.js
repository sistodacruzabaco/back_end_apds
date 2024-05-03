const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {requireAuth, checkUser} = require('../middleware/authMiddleware')

// GET /users
router.get('/getUsers', userController.get_users);

// POST /user
router.post('/addUser', userController.add_user);

// PUT/user
router.put('/updateUser/:id', userController.update_user);

// DELETE/user
router.delete('/deleteUser/:id', userController.delete_user);

module.exports = router;