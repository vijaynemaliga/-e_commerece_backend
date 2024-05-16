const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_schema=  new Schema({
    name:{type:String , required: true},
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:0
    },
    orderid:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'order',
        default:null
    }],
    whishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        default:null
    }],
    productid:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        default:null
    }]
})
module.exports= mongoose.model('user',user_schema)