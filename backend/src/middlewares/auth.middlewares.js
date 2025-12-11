const foodPartnerModel = require('../models/foodpartner.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authenticateFoodPartner(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'Please login first.'});
    }
    try{
       const decoded = jwt.verify(token, process.env.JWT_URL)
        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;
        next();
    }catch(err){
        return res.status(401).json({message: 'Invalid Token. Please login again.'});
    }
}

async function authUserMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: 'Please login first.'
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_URL)
        const user = await userModel.findById(decoded.id);

        req.user = user;
        next();
    }catch(err){
        return res.status(401).json({message: 'Invalid Token. Please login again.'});
    }
}


module.exports = {
    authenticateFoodPartner,
    authUserMiddleware
};