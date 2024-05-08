const order= require('../models/order')
const product= require('../models/product')
const user= require('../models/user')


exports.allproducts= async (req,res,next)=>{
  const allproducts= await product.find({})
  res.status(200).json(allproducts)
}

// exports.allcategory= async(req,res,next)=>{
//     const products= await product.find({})
//     for(i=0;i<products.length();i++)
//         {

//         }
// }

