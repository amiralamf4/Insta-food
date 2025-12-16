const express = require('express');
const multer = require('multer')

const foodController = require('../controller/food.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

router.post('/', authMiddleware.authenticateFoodPartner, upload.single("video") ,foodController.createFood);
router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems)

router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFood);

router.post('/save', authMiddleware.authUserMiddleware, foodController.saveFood);

// get save videos on user id

router.get('/save', authMiddleware.authUserMiddleware, foodController.getSavevideos)

module.exports = router;