const order= require('../models/order')
const product= require('../models/product')
const user= require('../models/user')
const authorizer= require('../middlewares/authorization')
exports.allproducts= async (req,res,next)=>{
  const allproducts= await product.find({})
  res.status(200).json(allproducts)
}

exports.allcategory= async(req,res,next)=>{
  try{
    const products= await product.find({}).exec()
    console.log(products)
    const category=new Set();
    for(i=0;i<products.length;i++)
            category.add(products[i].category) 
   console.log(category)
    res.status(200).json(Array.from(category))
}catch(error){
  res.status(401).json({message:`error while fecthging categories, ${error}`})
}
        
}

