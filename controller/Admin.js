const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const adminSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String
});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;