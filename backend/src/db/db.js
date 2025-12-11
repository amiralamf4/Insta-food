const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  

function connectDB() {
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((err)=>{
        console.log("MongoDB connection error:",err);
    })
}

module.exports = connectDB;