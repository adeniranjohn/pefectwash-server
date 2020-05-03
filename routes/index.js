const express = require('express');
const index = express.Router();
const Customer = require('../model/customer.model');



    index.get('/:phone',async (req,res)=>{
    const customer = req.params.phone;
        try{
            const result = await Customer.find({phoneNumber : customer});
            if(result){
                 res.status(200).json({ data: result });
            }
        }catch(error){
            res.status(400).send(error);
        }

    })

    index.get('/', (req, res) => {
      res.send("Perfect Wash API");
    })
module.exports = index;
