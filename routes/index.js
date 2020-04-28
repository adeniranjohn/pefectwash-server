const express = require('express');
const index = express.Router();
const Customer = require('../model/customer.model');




    //customer check on their items
    index.get('/:phone',async (req,res)=>{
    const customer = req.params.phone;
        try{
            const result = await Customer.find({phoneNumber : customer});
            if(!result){
                return res.status(400).send("Kindly enter your correct phone number");
            }else{
                res.status(200).json({"data": result});
            }
        }catch(error){
            res.status(400).send("Connection error");
        }

    })

    index.get('/', (req, res) => {
      res.send("Perfect Wash API");
    })
module.exports = index;
