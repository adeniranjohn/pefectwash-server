const express = require('express');
const update = express.Router();
const mongoose = require('mongoose');
const Customer = require('../model/customer.model');
const auth = require('../config/auth');





update.get('/:id' ,(req,res)=>{
    const id = req.params.id;
    //console.log(id);
    Customer.findById(id)
    .then((docs)=>{
        if(!docs){
            console.log("There is no data");
        }else{
            res.render('Update',{layout: 'default', thisCustomer: docs});
        }
    }).catch((err)=>{
        console.log(err);
    });
    
    //const customerID = req.params.id;

});


update.post('/:id', (req,res)=>{
    console.log(req.body);
    console.log(req.params.id);
    const customerStatus = req.body.status;
    const customerId = req.params.id;
    const statusDate = (new Date()).toLocaleString();
    if(mongoose.Types.ObjectId.isValid(customerId)){
        Customer.update({_id: customerId}, {$set: {status: customerStatus, eventDate: statusDate}},{new: true})
    }

    res.redirect('/admin/dashboard');
    //console.log(thisCustomer);
});


module.exports = update;