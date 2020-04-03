const express = require('express');
const index = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Customer = require('../model/customerModel');
const Shop = require('../model/userModel');
const bcrypt = require('bcrypt');




    //customer check on their items
    index.get('/:phone',(req,res)=>{
    const customer = req.params.phone;
        console.log(customer);
        Customer.find({phoneNumber : customer})
        .then((docs)=>{ 
            //console.log(docs);
            res.status(200).json({
                "status": "success",
                "message": docs
            });
        })
        .catch((err)=> 
        res.status(401).json({
            "status": "error",
            "message":"something went wrong"
        }));


});




module.exports = index;