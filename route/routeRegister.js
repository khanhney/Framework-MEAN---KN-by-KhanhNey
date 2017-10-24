const express = require('express');
const route = express.Router();
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const User = require('../controller/User');
const {hash, compare} = require('bcrypt');


route.get('/dangKy', (req, res)=>{
    res.render('register');
});
// dangKy post
route.post('/dangKy', bodyParser, async (req, res)=>{
    const { username, email, password} = req.body;
    const hashPassword = await hash(password, 8);
    
    const user1  = new User({ username, email, password:hashPassword});
    user1.save()
    .then(result => res.render('loginUser', {data: result}));
});
module.exports = route;