const express = require('express');
const app = express();
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const {mongodb, ObjectId} = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const routeHome = require('./route/routeHome');
const routeLogin = require('./route/routeLogin');
const routeRegister = require('./route/routeRegister');
const routeTinTuc = require('./route/routeTinTuc');
const routeQuanLy = require('./route/routeQuanLy');

// Begin Session
const {Product, Anhchinh} = require('./controller/Product');
const Admin = require('./controller/Admin');
const session = require('express-session');
app.use(session({
    secret: 'asdasfdaf236256asda1',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // maxAge: 55000
    }
}));

app.get('/admin', (req, res)=>{
    const demo = req.session.checkk;
    if(demo === undefined || demo === false) return res.redirect('/dangNhap');
    Product.find({})
    .then(result => res.render('quanlyAdmin', {data: result}))
    .catch(err => console.log(err.message));
});
app.post('/dangNhap', bodyParser, (req, res)=>{
    const {username, password} = req.body;
    Admin.find({})
    .then(result => {
        if(result.some(e => username === e.username && password === e.password)){
            req.session.checkk = true;
            res.redirect('/admin');
        }else{
            res.redirect('/dangNhap');
        }
    })
    .catch(err => console.log(err.message));
});
// End Session

// app config
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
// app port
// use route
app.use(routeHome);
app.use(routeLogin);
app.use(routeRegister);
app.use(routeTinTuc);
app.use(routeQuanLy);


// 
const port = process.env.PORT || 3000;
// const uri = 'mongodb://khanhney123:123@ds149934.mlab.com:49934/cnpm'
const uri = 'mongodb://localhost/cnpm'
mongoose.connect(uri, {useMongoClient: true});
mongoose.connection.once('open', ()=>{
    app.listen(port, ()=> console.log('Server started at port 3000'));
})