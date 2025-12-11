const express = require('express')
const cookierParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.route');
const cors = require('cors');

const app= express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use(cookierParser());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to InstaZomato Backend");
})

app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/food-partner',foodPartnerRoutes);

module.exports= app;