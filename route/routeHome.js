const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser').urlencoded({extended: false});

const {Product, Anhchinh} = require('../controller/Product');

const fs = require('fs');

const upload = require('../uploads/uploadConfig');
// end Multer
const session = require('express-session');

route.get('/', (req, res)=>{
   
    Product.find({}).then(result => {
        Anhchinh.find({}).then(result2 =>{
            let zIndex = 1;
            res.render('index', {data: result, data2: result2, zIndex });
            console.log(typeof(zIndex), zIndex);
        })
    }).catch(err => console.log(err.message));
});

// route.get('/admin', (req, res)=>{
//     console.log(req.session.checkk);
//     Product.find({})
//    .then(result => res.render('quanlyAdmin', {data: result}))
//    .catch(err => console.log(err.message));
// });

route.get('/xoaProduct/:id', (req, res)=>{
    const {id} = req.params;
    Product.findByIdAndRemove(id)
    .then(result =>{
        res.redirect('/admin');
        req.session.checkk = true;
        if(result.imageProduct === "default.jpg") return;
        const path = './public/images/products/' + result.imageProduct;
        fs.unlink(path , (err)=>{
            if(err) console.log(err.message);
        })
    }).catch(err => console.log(err.message));
});
route.post('/themProduct', upload.single('imageProduct'),  (req, res) => {
    const {newsProduct,nameProduct, priceProduct } = req.body;
    const imageProduct = req.file ? req.file.filename : 'default.jpg';
    // res.send({newsProduct,nameProduct, priceProduct, img});
    const demo = Product({imageProduct, newsProduct,nameProduct, priceProduct});
    demo.save()
    .then(()=> res.redirect('/admin'))
    .catch(err => console.log(err.message));
});


// route get sua => gui du lieu cho post
route.get('/suaProduct/:id', (req, res)=>{
    const { id } = req.params;
    Product.findById(id)
    .then(result => res.render('suaProduct', {data: result}))
    .catch(err => console.log(err.message));
});




// route post sua
route.post('/suaProduct/:id', upload.single('imageProduct'), (req, res)=>{
    const { id } = req.params;
    const { nameProduct, priceProduct, newsProduct,  oldImg} = req.body;
    const imageProduct = req.file ? req.file.filename : oldImg;
    Product.findOneAndUpdate(id, {imageProduct, nameProduct, priceProduct, newsProduct})
    .then(()=>{
       
        if(imageProduct !== oldImg) 
        {
            const path = './public/images/products/'+ oldImg;
            fs.unlink(path, (err)=>{
                if(err) console.log(err.message);
            })
            res.redirect('/admin');
        }else{
            res.redirect('/admin');
        }
        
    }).catch(err => console.log(err.message));
});

module.exports = route;


