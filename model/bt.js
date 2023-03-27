
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docghi = new Schema({
    title: String,
    image: String,
    email: String,
})

module.exports = mongoose.model('lab6', docghi);