const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var customerSchema = new Schema({
    shopPhone : String,
    name : String,
    phoneNumber : String,
    numberItems : Number,
    amountPaid: Number,
    status: {type:String, default: "Recieved",enum: ['Recieved', 'Washing', 'Drying', 'Pressing', 'Ready','Collected']}
},
{
    timestamps:true
  });

var Customer = mongoose.model('customer', customerSchema, 'customers' );

module.exports = Customer;
