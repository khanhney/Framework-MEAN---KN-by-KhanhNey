const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const TinTucSchema = mongoose.Schema({
    picture: String,
    title: String, 
    content: String
});

const TinTuc = mongoose.model('TinTuc', TinTucSchema);
module.exports = TinTuc;