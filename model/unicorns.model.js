var mongoose = require('mongoose')
var unicornSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    loves: [String],
    weight: Number,
    gender: String,
    vampires: Number,
    address: Boolean
})
var UnicornModel = new mongoose.model('unicorn',unicornSchema) 
module.exports = UnicornModel