const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order= new Schema({
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