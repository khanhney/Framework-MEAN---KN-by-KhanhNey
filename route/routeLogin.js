const express = require('express');
const route = express.Router();
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const Admin = require('../controller/Admin');
const User = require('../controller/User');
const {hash, compare} = require('bcrypt');
const session = require('express-session');


route.get('/dangNhap', (req, res)=>{
    res.render('loginAdmin');
});

// route.post('/dangNhap', bodyParser, (req, res)=>{
//     const {username, password} = req.body;
//     Admin.find({})
//     .then(result => {
//         if(result.some(e => username === e.username && password === e.password)){
//             req.session.checkk = true;
//             res.redirect('/admin');
//         }else{
//             res.redirect('/dangNhap');
//         }
//     })
//     .catch(err => console.log(err.message));
// });
route.get('/dangNhapUser', (req, res)=>{
    res.render('loginUser');
})
route.post('/dangNhapUser', bodyParser, async (req, res)=>{
    const {username, password} = req.body;
    User.findOne({username})
        .then(result => {
            compare(password, result.password)
                .then(result2 => {
                    if(result2) return res.redirect('/');
                    res.redirect('/dangNhapUser');
                });
        })
        .catch(err =>{
            console.log(err.message);
            res.redirect('/dangNhapUser');
        })
});


route.get('/thongTinTaiKhoan', (req, res)=>{
    
});
module.exports = route;

// 10/9 xử lý bcrypt