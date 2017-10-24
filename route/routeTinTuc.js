const express = require('express');
const route = express.Router();
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const TinTuc = require('../controller/TinTuc');

route.get('/tintuc', (req, res)=>{
    TinTuc.find({})
    .then(result => res.render('tinTuc', {data: result}))
    .catch(err => console.log(err.message));
});

module.exports = route;