const express = require('express');
const admin = express.Router();
const Customer = require('../model/customer.model');
const Shop = require('../model/user.model');
const bcrypt = require('bcrypt');
const { auth, theadmin } = require('../config/auth');





// Create a shop
admin.post('/createShop',[auth, theadmin], async (req, res) => {

 
  try {
    let { shopName, phoneNumber } = req.body;
    console.log(req.body);
    let password = 'welcome';
    let role = 'Supervisor';
    
    const result = await Shop.findOne({ phoneNumber: phoneNumber })
    if (result) return res.status(400).send("Phone number is already registered to a Shop")
    const salt = await bcrypt.genSalt(10);
    const hashedpwd = await bcrypt.hash(password, salt);

    const shop = new Shop({
      shopName: shopName,
      phoneNumber: phoneNumber,
      password: hashedpwd,
      role: role
    })
    console.log(shop);
    shop.save();
    res.status(200).json({"shop": shop});

  } catch (error) {
    res.status(400).send(`Error : ${error}`)
  }
});


admin.get('/seeShops',  auth, async (req, res) => {

  try {const shops = await Shop.find({});
  if(shops){
    return  res.status(200).json({"shops": shops});
    } else {
      res.status(400).send("There are no shops available for you to see")
    }
  }catch(error){
    res.status(400).send(`Error: ${error}`)
  }
});

admin.put('/:phone/changePassword', [auth, theadmin], async(req,res) => {

  const shopPhone = req.params.phone;
  if(req.body.password === req.body.confirmPassword){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpwd = await bcrypt.hash(password, salt);
        await Shop.findOneAndUpdate({phoneNumber: shopPhone}, {$set: {password: hashedpwd}});
        return res.status(200).json("Password changed successfully");
    }catch(error){
        return res.status(500).send(`Error: ${error}`)
    }
    


  
  }

});
admin.post('/signin', async (req, res) => {

  const { phoneNumber, password } = req.body;

  try{
    const shop = await Shop.findOne({ phoneNumber: phoneNumber })
   if(!shop) {
     return res.status(400).send("Invalid Phone number/Password");
    }else{
      const result = await bcrypt.compare(password, shop.password);
      if(!result){
        res.status(400).send("Invalid Phone number/Password");
      }else{
        const token = shop.generateToken();
        res.header('x-auth-token', token).status(200).json({"shop": shop, "token": token});
      }
    }}catch(error){
      res.status(400).send(`Error: ${error}`);
    }

});

admin.get('/:phone/customers', auth,  async (req, res) => {
 try{ 
  const shop = await Shop.findOne({phoneNumber: req.params.phone});
  console.log(shop.phoneNumber);
  const customers = await Customer.find({shopPhone: shop.phoneNumber});
  if(!customers){
    return res.status(400).send("There is no customer for this shop")
  }else{
    res.status(200).json({"customers": customers});
  }}catch(error){
    res.status(400).send(`Error: ${error}`);
  }
  
});


admin.get('/customers', auth, async (req, res) => {
  try{ 
    const customers = await Customer.find({});
   if(!customers){
     return res.status(400).send("There is no customer for this shop")
   }else{
     res.status(200).json({"data": customers});
   }}catch(error){
     res.status(400).send(`Error: ${error}`);
   }
   
 });

admin.get('/customers/:id', auth, async (req, res) => {
  
  try{  
    const customer = await Customer.find({ _id: req.params.id});
    if (!customer) {
      return res.status(400).send("Customer does not exist")
    } else {
      res.status(200).json({"customer": customer})
    }}catch(error){
      return res.status(400).send(`Error: ${error}`)
    }

});

admin.put('/customers/:id', auth, async (req, res) => {
  console.log(req.body);
  try{  
    const customer = await Customer.findOneAndUpdate({ _id: req.params.id}, {$set : {status: req.body.status}});
    res.status(200).json({"customer": customer});
    }catch(error){
      return res.status(400).send(`Error: ${error}`)
    }

});






admin.delete('/customers/:id', auth, (req, res) => {
  Customer.findOneAndDelete({ _id: req.params.id }, (err, customer) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        "status": "delete a customer",
        "customers": customer
      })
    }
  });
});

admin.post('/', auth,  async (req, res) => {

  const name = req.body.name;
  const phone = req.body.phone;
  const itemsCount = req.body.itemsCount;
  const amount = req.body.amount;
  const eventDate = (new Date()).toLocaleString();
  const shopPhone = req.body.shopPhone

  try {
    const customer = new Customer({
      shopPhone: shopPhone ,//req.shop.shopName,
      name: name,
      phoneNumber: phone,
      numberItems: itemsCount,
      amountPaid: amount,
      eventDate: eventDate,

    });
    console.log(customer);
    customer.save();
    res.status(200).json({"customer": customer})
  } catch (error) {
    res.status(401).send(`Error: ${error}`)
  }
});

module.exports = admin;
