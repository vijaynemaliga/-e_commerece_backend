var express = require('express');
var router = express.Router();
const product_controllers=require('../controllers.js/productcontrollers')
const {authorizer}= require('../middlewares/authorization')
const multer = require("multer")

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });

//allproducts route
router.get('/all',authorizer,product_controllers.allproducts);
//form to add a product
router.get('/addnewProduct',product_controllers.categoryForm)
//get all category  names
router.get('/category',product_controllers.allcategory)
//all product in category 
router.get('/:category/allProducts',product_controllers.allCategoryProducts)
//get a specified product in a category
router.get('/category/:name',product_controllers.getProductByName)
//add new product
router.post('/addnewproduct',upload.single('image'),product_controllers.newCategory)

module.exports = router;
