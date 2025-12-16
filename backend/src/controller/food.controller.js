const { v4: uuid} = require("uuid")
const foodModel = require('../models/food.model');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');

const storageService = require('../services/storage.service');

async function createFood(req, res){
    
    const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())
    
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description, 
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })
    
    res.status(201).json({
        message: "Food Item created successfully",
        food: foodItem
    })

    
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food Items fetched successfully",
        foodItems
    });
}



async function likeFood(req, res) {
    const {foodId}=req.body;
    const user = req.user;
    const isAlreadyLike = await likeModel.findOne({
        user:user._id, 
        food:foodId
    });

    if(isAlreadyLike){
       await likeModel.deleteOne({
        user:user._id, 
        food:foodId
    });

    await foodModel.findByIdAndUpdate(foodId,{
        $inc: { LikeCount: -1 }
    })

    return res.status(200).json({
        message: "Food item unliked successfully" 
    });
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId,{
        $inc: { LikeCount: 1 }
    })

    res.status(201).json({
        message: "Food item liked successfully",
        like
    })
}

async function saveFood(req, res) {

    const {foodId} = req.body;
    const user = req.user;
    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    });
    if(isAlreadySaved){
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        });
        await foodModel.findByIdAndUpdate(foodId,{
            $inc: {saveCount: -1}
        })
        return res.status(200).json({
            message: "Food item unsaved successfully"
        });
    }
    const save = await saveModel.create({
        user: user._id,
        food: foodId
    });
    await foodModel.findByIdAndUpdate(foodId,{
            $inc: {saveCount: 1}
        })
    res.status(201).json({
        message: "Food item saved successfully",
        save
    });


}


async function getSavevideos(req, res){
    const user = req.user;
    const saveFoods = await saveModel.find({user: user._id}).populate('food');

    if(!saveFoods || saveFoods.length ===0){
        return res.status(404).json({message: "No save videos found"})
    }
    res.status(200).json({
        message: "Save foods retrieved successfuly",
        saveFoods
    })
}



module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavevideos
};