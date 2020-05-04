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


admin.get('/shops',  [auth,theadmin],  async (req, res) => {

  try {const shops = await Shop.find({}).sort({shopName: 'asc'});
  if(shops){
    return  res.status(200).json({"shops": shops});
    } else {
      res.status(400).send("There are no shops available for you to see")
    }
  }catch(error){
    res.status(400).send(`Error: ${error}`)
  }
});

admin.get('/shops/:id',  [auth,theadmin] ,  async (req, res) => {
  try {
    const shop = await Shop.find({_id: req.params.id});
    const washes = await Customer.find({shopPhone: shop[0].phoneNumber});
    const totalWashes = await Customer.find({shopName: shop[0].shopName});
  if(shop){
    return  res.status(200).json({
      "shop": shop,
      "washes": washes,
      "shopWashes": totalWashes
  });
    } else {
      res.status(400).send("There are no wash")
    }
  }catch(error){
    res.status(400).send(`Error: ${error}`)
  }
});


admin.delete('/shops/:id', [auth,theadmin] , (req, res) => {
  Shop.findOneAndDelete({ _id: req.params.id }, (err, shop) => {
    if (err) {
      res.status(500).send("Data error")
    } else {
      res.status(200).json({
        "status": "delete a shop",
        "shop": shop
      })
    }
  });
});

admin.post('/signin', async (req, res) => {

  const { phoneNumber, password } = req.body;

  try{
    const shop = await Shop.findOne({phoneNumber: phoneNumber});
   if(!shop) {
     return res.status(400).send("Invalid Phone number/Password");
    }else{
      const result = await bcrypt.compare(password, shop.password);
      if(!result){
        res.status(400).send("Invalid Phone/Password");
      }else{
        const token = shop.generateToken();
        res.header('auth-pfw-token', token).status(200).json({"shop": shop, "token": token});
      }
    }}catch(error){
      res.status(400).send(`Error: ${error}`);
    }

});

admin.get('/:phone/customers', auth,  async (req, res) => {
 try{
  const shop = await Shop.findOne({phoneNumber: req.params.phone}).sort({eventDate: -1});
  const customers = await Customer.find({shopPhone: shop.phoneNumber});
  if(!customers){
    return res.status(400).send("There is no customer for this shop")
  }else{
    res.status(200).json({"customers": customers});
  }}catch(error){
    res.status(400).send(`Error: ${error}`);
  }

});


admin.get('/customers', [auth,theadmin] , async (req, res) => {
  try{
    const customers = await Customer.find({}).sort({createdAt: 'desc'});
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
  // changing status of customer items
  try{
    const customer = await Customer.findOneAndUpdate({ _id: req.params.id}, {$set : {status: req.body.status}});
    res.status(200).json({"customer": customer});
    }catch(error){
      return res.status(400).send(`Error: ${error}`)
    }

});


admin.put('/changePassword',[ auth, theadmin],  async (req, res) => {
  // changing status of customer items
console.log(req.body);
  if(req.body.password === req.body.confirmpassword){
    try{
      const salt = await bcrypt.genSalt(10);
      const hashedpwd = await bcrypt.hash(req.body.newpassword, salt);
      const shop = await Shop.findOneAndUpdate({ phoneNumber: req.body.phonenumber}, {$set : {password: hashedpwd, role: req.body.roles}});
      res.status(200).json({"customer": shop });
      }catch(error){
        return res.status(400).send(`Error: ${error}`)
      }

  }else{
    console.log("Password not match");
  }
});






admin.delete('/customers/:id', [auth,theadmin] , (req, res) => {
  Customer.findOneAndDelete({ _id: req.params.id }, (err, customer) => {
    if (err) {
      res.status(400).send(`Error: ${error}`);
    } else {
      res.status(200).json({
        "status": "delete a customer",
        "customers": customer
      })
    }
  });
});

admin.post('/customers', auth,  async (req, res) => {

  const name = req.body.name;
  const phone = req.body.phone;
  const itemsCount = Number(req.body.itemsCount);
  const amount = Math.abs(req.body.amount);
  const eventDate = (new Date()).toLocaleString();
  const shopPhone = req.body.shopPhone;

  try {
    const customer = new Customer({
      shopPhone: shopPhone ,//req.shop.shopName,
      name: name,
      phoneNumber: phone,
      numberItems: itemsCount,
      amountPaid: amount,
      eventDate: eventDate,

    });

    await customer.save();
    res.status(200).json({"customer": customer})
  } catch (error) {
    res.status(401).send(`Error: ${error}`)
  }
});

module.exports = admin;
