const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//Mongoose connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => { console.log("Connected to Database") })
    .catch(() => { console.log("Unable to connect to the Database") });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


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
      enum: ["Supervisor", "Administrator", "SuperAdministrator"],
      default: "Supervisor"
    },
    lastSign: {
      type: Date,
      default: null
    },
    password: {
      type:String
    },
    createdAt:
      {
      type :Date,
      default : Date.now()
    }
},{
  timestamps:true
});


shopSchema.methods.generateToken = function(){
  const token = jwt.sign({_id: this._id, phoneNumber: this.phoneNumber, role: this.role}, process.env.JWT_KEY, { expiresIn: 60*60});
  return token;
}

const Shop = mongoose.model('shop', shopSchema, 'shops' );

module.exports = Shop;





