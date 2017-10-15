const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String
});
const User = mongoose.model('User', userSchema);
module.exports = User;