const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var customerSchema = new Schema({
    shopPhone : String,
    name : String,
    phoneNumber : String,
    numberItems : Number,
    amountPaid: Number,
    status: {type:String, default: "Recieved"},
    eventDate: Date
},
{
    timestamps:true
  });

var Customer = mongoose.model('Customer', customerSchema );

module.exports = Customer;