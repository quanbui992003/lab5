
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docghi = new Schema({
    namesp: String,
    gia: Number,
    soluong: Number,
})

module.exports = mongoose.model('lab6', docghi);