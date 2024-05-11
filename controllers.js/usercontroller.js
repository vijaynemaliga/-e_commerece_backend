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
    const refresh_token= jwt.sign({username},process.env.jwt_refresh_secret_key)
    res.status(200).json({access_token,refresh_token})
}
exports.refresh_Token=async(req,res,next)=>{
    try {
        
        let token = req.headers.authorization;
        console.log(token)
        if (!token){
         return res.status(404).json({ success: false, msg: "Token not  found" });
        }
       token = token.split(" ")[1];
       const decoded = jwt.verify(token, process.env.jwt_refresh_secret_key);
       console.log( req.headers)
       console.log( decoded.username)
       const username = decoded.username;
       const access_token=jwt.sign({username},process.env.jwt_secert_key,{ expiresIn: '15m' })
       const refresh_token= jwt.sign({username},process.env.jwt_refresh_secret_key)
       return res.status(200).json({access_token,refresh_token})
      } catch (error) {
      return res.status(401).json({ success: false, msg: error.message });
      }
}

exports.postOrder = async (req, res, next) => {
    try {
        const userDetails = await user.findOne({ name: req.body.name });
        if (!userDetails) {
            return res.status(400).json({ msg: "Invalid user" });
        }

        const decodedTitle=decodeURIComponent(req.body.title)
        console.log(decodedTitle)
        const result = await product.findOne({ title:decodedTitle });
        console.log(result)
        if (!result) {
            return res.status(400).json({ msg: "Invalid product" });
        }
        const productid=[] 
        productid.push(result._id)
        const newOrder = new order({
            status: 'notdelivered',
           productid
        });
        
        await newOrder.save();
        res.status(200).json({ msg: "Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ msg: `Error while posting order details: ${error.message}` });
    }
};
