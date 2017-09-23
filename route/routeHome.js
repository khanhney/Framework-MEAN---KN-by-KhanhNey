const express = require('express');
const route = express.Router();
const Product = require('../controller/Product');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
/*
// app api
route.get('/', (req, res)=>{
    res.json({message: 'Hello EveryBody.My Name Is KhanhNey'});
});
// get info of db
route.get('/getDemo', (req, res)=>{
    classDemo.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err.message));
});
// add info of db
route.post('/postDemo/:name/:age/:address/:email', (req, res)=>{
    const {name, age, address, email} = req.params;
    var a = new classDemo({name, age, address, email});
    a.save()
    .then(result => res.json(result))
    .catch(err => console.log(err.message));
});
// delete info of db
route.delete('/removeDemo/:id', (req, res)=>{
    const {id} = req.params;
    classDemo.findByIdAndRemove(id)
    .then(result => res.json(result))
    .catch(err => console.log(err.message));
});
// edit info of db
route.get('/editDemo/:id', bodyParser, (req, res)=>{
    const {id} = req.params;
    const {name, age, address, email} = req.body;
    classDemo.findById(id)
    .then(result => res.render('home', {data: result}))
    .catch(err => console.log(err.message));
});
route.post('/editDemo/:id', (req, res)=>{
    const {id} = req.params;
    classDemo.findByIdAndUpdate(id)
    .then(result => res.json(result))
    .catch(err => console.log(err.message));
});*/
// exporst route

route.get('/', (req, res)=>{
    Product.find({})
    .then(result => res.render('index', {result}))
    .catch(err => console.log('lỗi tại render trang index'+ err.message));
});
module.exports = route;


