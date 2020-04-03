const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Shop = require('../model/userModel');
const bcrypt = require('bcrypt');




module.exports  = function(passport){

  passport.use(new LocalStrategy({usernameField: 'phoneNumber'}, (phoneNumber, password, done) => {
    console.log(phoneNumber);
    console.log(password)
    Shop.findOne({ phoneNumber: phoneNumber })
      .then(shop => {
        if(!shop) {
          return done(null, false, { info:  'Phone number not registered'  });
        }

     


          bcrypt.compare(password, shop.password, (err, matched)=>{
            console.log(password);
            if(err) throw err;
            console.log(matched);
            if(matched){
              return done(null, shop, {info: 'Login successful' });
              
            }else{
              return done(null, false, {info: 'Password incorrect' });
            
            }
          });
      }).catch(err => console.log(err));
  }));


  passport.serializeUser((shop, done)=>{
    //console.log(shop);
    console.log("serialize" + shop.id);
    done(null, shop.id);
  });
  passport.deserializeUser((id, done)=>{
    console.log("deserialize")
      Shop.findById(id, (err, shop)=>{
        done(err, shop);
      });
  });
}
 