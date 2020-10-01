const mongoose = require('mongoose');
const express = require('express');
const newsletterRoutes = require('./route/newsletter');
const userRoutes = require('./route/user');
const addressRoutes = require('./route/address');
const shopRoutes = require('./route/shop');

const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const frontendRoutes = require('./route/router');

mongoose.connect('mongodb+srv://admin:123Banane!@clustertest.fgsnt.mongodb.net/webshop?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Fail to connect to database'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.urlencoded({ extended: false }));

app.use(express.static('../public'));

app.use(cookieParser());

app.use(methodOverride('_method'));

//backend routes //////////////////////////////////////////////////////////////////////
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user/address', addressRoutes);
app.use('/api/shop', shopRoutes);


//frontend routes ////////////////////////////////////////////////////////////////////
app.use('/', frontendRoutes);


module.exports = app;