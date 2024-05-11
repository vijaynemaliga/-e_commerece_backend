const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order_schema= new Schema({
    status:{
        type: String,
        enum: ['delivered', 'notdelivered', 'cancelled'],
         default: 'notdelivered'
    },
    productid:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        default:null
    }]
})
module.exports= mongoose.model('order',order_schema)