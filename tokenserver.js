var express = require('express')
var cors = require("cors")
const mongoose = require('mongoose');
var jwt = require("jsonwebtoken")
const UserModel = require('./model/users.model');
const PaymentModel = require('./model/payments.model');


var app = express();
const mongoUri = "mongodb+srv://rb42:hello123@cluster0.eitlw5l.mongodb.net/Rb42?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUri)

var bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post("/login",function(req,res){
    UserModel
    .findOne({username:req.body.username,password:req.body.password})
    .then((data)=>{
        console.log("sdfs",data)
        var token = jwt.sign(req.body,"evariki cheppaku")
        res.send({msg:"Manchigunnav",token})
    })
    .catch(()=>{
        res.send({msg:'Chisukomari'})
    })
})


app.get("/getMyPayments",(req,res)=>{
    PaymentModel.find({username:req.cookies.username})
    .then(data=>res.send(data))
    .catch(err=>res.send(err))
})

app.listen(4140,()=>console.log("server running on 4140"))
/*
userCollection
    [
        {
            username:"",
            password:""
        },
        {
            username:"",
            password:""
        },
        {
            username:"",
            password:""
        },
]

paymentsCollection
[
    {
        username:'',
        amount:'',
        timestamp:'',
        modeofPayment:'',
        transactionID:''
    },
    {
        username:'',
        amount:'',
        timestamp:'',
        modeofPayment:'',
        transactionID:''
    },
    {
        username:'',
        amount:'',
        timestamp:'',
        modeofPayment:'',
        transactionID:''
    },
    {
        username:'',
        amount:'',
        timestamp:'',
        modeofPayment:'',
        transactionID:''
    },
    {
        username:'',
        amount:'',
        timestamp:'',
        modeofPayment:'',
        transactionID:''
    },
    {
        username:'',
        amount:'',
        timestamp:'',
        modeofPayment:'',
        transactionID:''
    },
]
*/