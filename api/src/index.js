const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const userRoute = require('./routes/user'); 
const authRoute = require('./routes/auth'); 
const productRoute = require('./routes/product'); 
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');


const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB connection successfull!'))
    .catch((err) => console.log(err));


app.listen(process.env.PORT || 5000, () => {
    console.log('backend server is running');
})