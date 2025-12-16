const userModel = require('../models/user.model');
const foodpartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


async function registerUser(req, res) {
    const {fullName,email,password} = req.body;
    const isUserAlreadyExist = await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_URL)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function loginUser(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_URL)

    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user : {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

function logoutUser(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    })
}

async function registerFoodPartner(req, res) {
    const {name, businessName,email, phone,password} = req.body;
    const isAccountExist = await foodpartnerModel.findOne({email})
    if(isAccountExist){
        return res.status(400).json({
            message: "Food Partner account already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodpartnerModel.create({
        name,
        businessName,
        email, 
        phone,
        password: hashedPassword
    })
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_URL)

    res.cookie("token", token)

    res.status(201).json({
        message: "Food Partner registered successfully",
        foodPartner: {
            _id: foodPartner._id,
            businessName: foodPartner.businessName,
            name: foodPartner.name,
            email: foodPartner.email,
            phone: foodPartner.phone,
        }
    })
}

async function loginFoodPartner(req, res){
    const {email, password} = req.body;
    const foodPartner = await foodpartnerModel.findOne({email});

    if(!foodPartner){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_URL)

    res.cookie("token", token)
    res.status(200).json({
        message: "Food Partner logged in successfully", 
        foodPartner : {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

function logoutFoodPartner(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Food Partner logged out successfully"
    })
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
}