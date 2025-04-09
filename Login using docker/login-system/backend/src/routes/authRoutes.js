const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', authMiddleware, authController.verify);

module.exports = router;