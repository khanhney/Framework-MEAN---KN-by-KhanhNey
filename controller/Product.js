const mongoose  = require('mongoose');
mongoose.Promise = global.Promise;

const demoShema = mongoose.Schema({
    name: String,
    age: String, 
    address: String,
    email: String
});

const Product = mongoose.model('Product', demoShema);
module.exports = Product;