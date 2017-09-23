const express = require('express');
const app = express();
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const {mongodb, ObjectId} = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const classDemo = require('./controller//Product');
const route = require('./route/routeHome');

// app config
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
// app port

// use route
app.use( route);
const port = process.env.PORT || 3000;
const uri = 'mongodb://localhost/khanhneydb';
mongoose.connect(uri, {useMongoClient: true});
mongoose.connection.once('open', ()=>{
    app.listen(port, ()=> console.log('Server started at port 3000'));
})