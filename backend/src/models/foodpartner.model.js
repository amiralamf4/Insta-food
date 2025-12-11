const mongoose = require('mongoose');
const foodPartnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    businessName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    {
        timestamps: true
    })

const foodPartnerModel = mongoose.model('FoodPartner', foodPartnerSchema);

module.exports = foodPartnerModel;