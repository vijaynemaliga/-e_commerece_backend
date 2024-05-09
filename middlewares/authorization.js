const jwt = require('jsonwebtoken');
require('dotenv').config();
 const authorizer=(req,res,next)=>{
    try {
        console.log(req.headers)
        let token = req.headers.authorization;
        console.log(token)
        if (!token){
         return res.status(404).json({ success: false, msg: "Token not  found" });
        }
       token = token.split(" ")[1];
       const decoded = jwt.verify(token, process.env.jwt_secert_key);
       req.username = decoded.username;
       next();
      } catch (error) {
      return res.status(401).json({ success: false, msg: error.message });
      // console.error(error);
      }
}
 module.exports ={authorizer};