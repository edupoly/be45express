var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
    username: String,
    password: String
})
var UserModel = new mongoose.model('user',userSchema) 
module.exports = UserModel