const express = require('express');
const foodController = require('../middlewares/food-partner.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const router = express.Router();

// /api/food-partner/profile/:id

router.get("/:id", 
    authMiddleware.authUserMiddleware, 
    foodController.getFoodPartnerById);


module.exports = router;