const express = require('express');
const authController = require('../controller/auth.controller');   
const router = express.Router();

// User auth apis
router.post('/user/register',authController.registerUser);
router.post('/user/login',authController.loginUser);
router.get('/user/logout',authController.logoutUser); 

// Food Partner auth apis
router.post('/foodpartner/register',authController.registerFoodPartner);
router.post('/foodpartner/login',authController.loginFoodPartner);
router.get('/foodpartner/logout',authController.logoutFoodPartner);

module.exports = router;