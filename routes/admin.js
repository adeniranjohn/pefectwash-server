const express = require('express');
const admin = express.Router();
const Customer = require('../model/customer.model');
const Shop = require('../model/user.model');
const bcrypt = require('bcrypt');
const { auth, theadmin } = require('../config/auth');





// Create a shop
admin.post('/createShop', [auth, theadmin], async (req, res) => {

  let { shopName, phoneNumber } = req.body;
  let password = 'welcome';
  let role = 'Supervisor';
  try {
    const shop = await Shop.findOne({ phoneNumber: phoneNumber })
    if (shop) return res.status(400).send("Phone number is already registered to a Shop")
    const hashedpwd = await bcrypt.hash(newShop.password, 10)
    const newShop = new Shop({
      shopName,
      phoneNumber,
      password: hashedpwd,
      role
    })

    await newShop.save();
    res.status(200).redirect('/admin/dashboard');

  } catch (error) {
    res.status(400).send(`Error : ${error}`)
  }
});


admin.get('/seeShops', [auth, theadmin], async (req, res) => {

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

admin.post('/signin', async (req, res) => {

  const { phoneNumber, password } = req.body;

  try{const shop = await Shop.findOne({ phoneNumber: phoneNumber })
   if(shop) {
     return res.status(400).send("Invalid Phone number/Password");
    }else{
      const result = await bcrypt.compare(password, shop.password);
      if(!result){
        res.status(400).send("Invalid Phone number/Password");
      }else{
        const token = shop.generateToken();
        res.header('x-auth-token', token).status(200).json({
          "status": "Login successfullyy",
          "shop": shop
        })
      }
    }}catch(error){
      res.status(400).send(`Error: ${error}`);
    }

});

admin.get('/customers', auth, async (req, res) => {
 try{ const customers = await Customer.find({});
  if(!customers){
    return res.status(400).send("There is no customer for this shop")
  }else{
    res.status(200).json({"customers": customers});
  }}catch(error){
    res.status(400).send(`Error: ${error}`);
  }
  
});

admin.get('/customers/:id', auth, async (req, res) => {
  
  try{  const customers = await Customer.find({ _id: req.params.id });
    if (!customers) {
      return res.status(400).send("Customer does not exist")
    } else {
      res.status(200).json({"customers": customer})
    }}catch(error){
      return res.status(400).send(`Error: ${error}`)
    }

});


admin.delete('/customers/:id', [auth, theadmin], (req, res) => {
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

admin.post('/', auth, async (req, res) => {

  const name = req.body.name;
  const phone = req.body.phone;
  const itemsCount = req.body.itemsCount;
  const amount = req.body.amount;
  const eventDate = (new Date()).toLocaleString();


  try {
    const customer = new Customer({
      shopName: req.shop.shopName,
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
