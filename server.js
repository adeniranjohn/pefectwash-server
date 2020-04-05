const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('flash');
const cors = require('cors');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const fs = require('fs');


const app = express();
const port = process.env.PORT || 7000;
app.use(cors());




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//routing 
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const updateRouter = require('./routes/update');






//connect mongodb 
mongoose.connect("mongodb://localhost:27017/perfectWash", { useNewUrlParser: true })
    .then(() => { console.log("Connected to Database") })
    .catch(() => { console.log("Unable to connect to the Database") });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


//Mounting 
app.use('/api/v1', indexRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/update', updateRouter);
app.use('/api/v1/shop', shopRouter);


app.listen(`${port}`, function (req, res) {
    console.log(`https://localhost:${port}`);
    console.log((new Date()).toLocaleString());
})

