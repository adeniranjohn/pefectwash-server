const express = require('express');
const mongoose = require('mongoose');
//require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routing
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const updateRouter = require('./routes/update');






//connect mongodb
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
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

