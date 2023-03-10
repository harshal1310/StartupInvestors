const mongoose = require('mongoose');
//var jwt = require('jsonwebtoken');
//var jwt = require('jsonwebtoken');

var schema = new mongoose.Schema({
    name : String,
    message : String
})
const Userdb = mongoose.model('p', schema);

module.exports = Userdb;