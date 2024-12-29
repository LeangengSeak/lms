const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')

// register
router.get('/register', authController.getRegister)
// router.post('/register', authController.postRegister)

// login
router.get('/login', authController.getLogin)
// router.post('/login', authController.postLogin)

// forgot password
router.get('/forgot-password', authController.getForgotPassword)
// router.post('/forgot-password', authController.postForgotPassword)

// logout
// router.get('/logout', authController.logout)

module.exports = router;