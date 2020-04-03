const express = require('express');
const admin = express.Router();
const passport = require('passport');
const Customer = require('../model/customerModel');
const Shop = require('../model/userModel');
const bcrypt = require('bcrypt');
const { auth, theadmin } = require('../config/auth');





// Create a shop
admin.post('/createShop', [auth, theadmin], (req, res) => {

  let { shopName, phoneNumber } = req.body;
  let password = 'welcome';
  let role = 'Supervisor';
  Shop.findOne({ phoneNumber: phoneNumber })
    .then(user => {
      if (user) {

        res.status(400).json({
          status: "error",
          message: "Phone number is already registered to a Shop"
        })
        //res.render('createShop',{ layout: 'default', shopName, info: error} );
      } else {

        const newShop = new Shop({
          shopName,
          phoneNumber,
          password,
          role
        })


        bcrypt.hash(newShop.password, 10, (err, hash) => {
          if (err) throw err;

          newShop.password = hash;
          newShop.save()
            .then(shop => {

              res.status(200).redirect('/admin/dashboard');
            }).catch(err => console.log(err));
        });

        // res.render('createShop',{ layout: 'default'} );
      }
    })
    .catch(err => console.log(err));
});


admin.get('/seeShops', [auth, theadmin], (req, res) => {

  Shop.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "success",
        data: docs
      })
      //res.render('seeShops', { layout: 'default', shops: docs});
    }
  });

});

admin.post('/signin', (req, res) => {

  const { phoneNumber, password } = req.body;

  Shop.findOne({ phoneNumber: phoneNumber })
    .then(shop => {
      bcrypt.compare(password, shop.password, (err, result) => {
        const token = shop.generateToken();
        res.header('x-auth-token', token).status(200).json({
          "status": "Login successfullyy",
          "shop": shop
        })
      })

    });

})

admin.get('/customers', auth, (req, res) => {
  Customer.find({}, (err, customers) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        "status": "all customers",
        "customers": customers
      })
    }
  });
});

admin.get('/customers/:id', auth, (req, res) => {
  Customer.find({ _id: req.params.id }, (err, customers) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        "status": "a particular customer",
        "customers": customer
      })
    }
  });
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

admin.post('/', auth, (req, res) => {

  console.log(req.params.shopName);
  const name = req.body.name;
  const phone = req.body.phone;
  const itemsCount = req.body.itemsCount;
  const amount = req.body.amount;
  const eventDate = (new Date()).toLocaleString();


  try {
    const customer = new Customer({
      shopName: req.shop,
      name: name,
      phoneNumber: phone,
      numberItems: itemsCount,
      amountPaid: amount,
      eventDate: eventDate,

    });
    customer.save();
    res.status(200).json({
      "status": "customer job saved successfully",
      "customer": customer
    })
  } catch (err) {
    res.status(401).json({
      "status": "customer job was not saved properly"
    })
  }
})


module.exports = admin;
