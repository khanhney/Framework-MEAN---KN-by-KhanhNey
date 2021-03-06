const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const productSchema = mongoose.Schema({
    imageProduct: String,
    newsProduct: String,
    nameProduct: String,
    priceProduct: String
});
const picSchema = mongoose.Schema({
    imageFontEnd: String
});
const Product = mongoose.model('Product', productSchema);
const Anhchinh = mongoose.model('Anhchinh', picSchema );
// tên model trùng tên hoặc ko cần 's' // và trong db phải đặt chữ thường
module.exports = {Product, Anhchinh};