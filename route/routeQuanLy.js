const express = require('express');
const route = express.Router();
const {Product, Anhchinh} = require('../controller/Product');
const TinTuc = require('../controller/TinTuc');
const bodyParser = require('body-parser').urlencoded({extended: false});

const fs = require('fs');

const upload = require('../uploads/uploadConfig');
  

route.get('/sanpham/themsanpham', (req, res)=>{
    const demo = req.session.checkk;
    if(demo === undefined) return res.redirect('/dangNhap');
    Product.find({})
        .then(result => res.redirect('/admin'))
        .catch(err => console.log(err.message));
})
route.get('/baiviet/thembaiviet', (req, res)=>{
    TinTuc.find({})
        .then(result => {
            res.render('thembaiviet', {result});
        });
}); 
// route.post('/baiviet/thembaiviet', upload.single('imageProduct'), (req, res)=>{
//     const {title} = req.body;
//     console.log({title})
//     res.send(title)
// }); 
route.post('/baiviet/thembaiviet', upload.single('picture'),  (req, res) => {
    const { title, content } = req.body;
    const picture = req.file ? req.file.filename : 'default.jpg';
    // res.send({newsProduct,nameProduct, priceProduct, img});
    const demo = TinTuc( { title, content, picture });
    demo.save()
    .then(result => res.redirect('/baiviet/thembaiviet'))
    .catch(err => console.log(err.message));
});
route.get('/sanpham/danhsachsanpham', (req, res)=>{
    Product.find({})
        .then(result => {
            res.render('danhsachsanpham', {data: result});
        })
        .catch(err => console.log(err.message));
});
route.get('/thoat', (req, res)=>{
    req.session.checkk = false;
    res.redirect('/');
})
route.get('/baiviet/xoabaiviet', (req, res)=>{
   TinTuc.find({})
        .then(result => res.render('xoabaiviet', {result}))
        .catch(err => console.log(err.message));
});
route.get('/baiviet/xoabaiviet/:id', (req, res)=>{
    const {id} = req.params;
    TinTuc.findByIdAndRemove(id)
        .then(result => {
            res.redirect('/baiviet/xoabaiviet');
        })
        .catch(err => console.log(err.message));
})
module.exports = route;