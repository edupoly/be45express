var mongoose = require('mongoose')
var paymentSchema = new mongoose.Schema({
    "username":String,
    "amount":Number,
    "timestamp":String,
    "modeofPayment":String,
    "transactionID":String
})
var PaymentModel = new mongoose.model('payment',paymentSchema) 
module.exports = PaymentModel