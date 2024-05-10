const order= require('../models/order')
const product= require('../models/product')
const user= require('../models/user')
const authorizer= require('../middlewares/authorization')
const cloudinary = require("cloudinary").v2;
require('dotenv').config();

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key:process.env.api_key , 
  api_secret:process.env.api_secret
});

exports.allproducts= async (req,res,next)=>{
  const allproducts= await product.find({})
  res.status(200).json(allproducts)
}

exports.allcategory= async(req,res,next)=>{
  try{
    const products= await product.find({}).exec()
    console.log(products)
    const category=new Set();
    for(i=0;i<products.length;i++){
          for(j=0;j<products[i].length;j++)
             category.add(products[i].category[j]) 
        }
   console.log(category)
    res.status(200).json(Array.from(category))
}catch(error){
  res.status(401).json({message:`error while fecthging categories, ${error}`})
} }

exports.categoryForm=(req,res,next)=>{
   res.render('category_form')
}

exports.newCategory=async(req,res,next)=>{
  
  try{
    const {title,category,price,description}=req.body
    console.log(req.body)
    console.log(req.file.fieldname)
    const image = req.file.fieldname;
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(`Uploaded image: ${result.url}`);
    const newProduct= new product({
      title,
      price,
      description,
      category,
      image:result.secure_url
    })
    await newProduct.save()
    res.status(200).json(newProduct)
  }catch(error){
    res.status(500).json(error)
  }
}


exports.getProductByName=async(req,res,next)=>{
    try{
      if(req.params.name){
        const result= await product.find({title:req.params.name}).exec()
        console.log(result)
          res.status(200).json(result)
      }
      else
      res.status(500).json({msg:"enter the product name"})
    }catch(error){
      res.status(500).json(`error ocurred during fecthing product ${error}`)
    }
}


exports.allCategoryProducts=async(req,res,next)=>{
  try{
    if(!req.params.category)
      res.status(500).json({msg:"enter the category name"})
    const result= await product.find({category:req.params.category}).exec()
    console.log(result)
    res.status(200).json(result)
  }catch(error){
  res.status(500).json(`error ocurred during fecthing  category product ${error}`)
}
}