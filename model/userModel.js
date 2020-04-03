const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = "perfectWashKey";
//Mongoose connection
const shopSchema = new mongoose.Schema({
    shopName : {
      type: String,
      required: true
    },
    phoneNumber :{
      type: String,
      required: true,
      unique: true},
    role: {
      type: String,
      enum: ["Supervisor", "Administrator", "SuperAdministrator"]
    },
    lastSign: {
      type: Date,
      default: null
    },
    password: {
      type:String,
      length: 120
    },
    createdAt: 
      {
      type :Date,
      default : Date.now()
    }
},{
  timestamps:true
});


shopSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

shopSchema.methods.generateToken = function(){
  const token = jwt.sign({_id: this._id, phoneNumber: this.phoneNumber, role: this.role}, secret, { expiresIn: 60*60});
  return token;
}

const Shop = mongoose.model('Shop', shopSchema );

module.exports = Shop;





