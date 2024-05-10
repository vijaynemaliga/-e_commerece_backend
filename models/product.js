const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product_schema=new Schema({
    id :{type:Number },
    title:{type:String},
    price:{type:Number},
    description:{type:String},
    category:[{type:String}],
    image:{type:String,default:null},
    rating:{
        rate:{type:Number},
        count:{type:Number}
    },
    comments:{type:String,maxLength:100}
})

module.exports= mongoose.model('product',product_schema)