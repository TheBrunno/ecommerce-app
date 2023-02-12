const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoute = require('./routes/user'); 
const authRoute = require('./routes/auth'); 
const productRoute = require('./routes/product'); 

const app = express();

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB connection successfull!'))
    .catch((err) => console.log(err));


app.listen(process.env.PORT || 5000, () => {
    console.log('backend server is running');
})