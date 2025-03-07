var mongoose = require('mongoose')

var playerSchema = new mongoose.Schema({
    name:String,
    age:Number,
    sport:String,
    country:String
})

var PlayerModel = new mongoose.model('player',playerSchema)
module.exports = PlayerModel;