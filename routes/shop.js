const express = require('express');
const shop = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Customer = require('../model/customerModel');
const Shop = require('../model/userModel');
const bcrypt = require('bcrypt');
const auth = require('../config/auth');
const session = require('express-session');
require('../config/passport')(passport);


shop.get('/:id', (req,res)=>{
    const id = req.params.id;
    Shop.findById(id)
    .then((docs)=>{
        if(!docs){
            console.log("There is no such Shop");
        }else{
            res.render('editShop',{layout: 'default', thisShop: docs});
        }
    }).catch((err)=>{
        console.log(err);
    });
})

//change password 
shop.post('/:id', (req,res)=>{
    const shopId = req.params.id;
    if(req.body.password === req.body.confirmPassword){
        
        bcrypt.hash(req.body.password , 10, (err, hash)=>{
                const shopPassword =  hash;
            if(mongoose.Types.ObjectId.isValid(shopId)){
                Shop.findOneAndUpdate({_id: shopId}, {$set: {password: shopPassword}})
                .then((docs)=>{
                    if(docs){
                        resolve({success: true,data: docs});
                    }else{
                        resolve({success: false,data: "No such data exist"});
                    }
                } )
                .catch(err=>reject(err));
                res.redirect('/admin/dashboard');
            }
    

        })

        
        

    }else{

    }
})


module.exports = shop