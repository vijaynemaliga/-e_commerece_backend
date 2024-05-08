const order= require('../models/order')
const product= require('../models/product')
const user= require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.getloginform=(req,res,next)=>{
    res.render("../views/login")
}
exports.postloginCrendentials=async(req,res,next)=>{
    const username=req.body.name
    const value= await user.findOne({name:req.body.name})
    console.log(value)
    if(value)
        return res.status(400).json({ error: "Username already exists" });


    const plaintextPassword = req.body.password;
    const saltRounds = 10; 
    bcrypt.hash(plaintextPassword, saltRounds, async (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
        } else {
            const newUser= new user({name:req.body.name,password:hash})
            await newUser.save()
            console.log('Hashed password:', hash);
            // Save the hash to the user's record in the database
        }
    });
    const access_token=jwt.sign({username},process.env.jwt_secert_key,{ expiresIn: '15m' })
    res.status(200).json(access_token)
}