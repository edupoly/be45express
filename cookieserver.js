var express = require('express')
var app = express();

const mongoUri = "mongodb+srv://rb42:hello123@cluster0.eitlw5l.mongodb.net/Rb42?retryWrites=true&w=majority&appName=Cluster0"
const mongoose = require('mongoose');
mongoose.connect(mongoUri)
const UserModel = require('./model/users.model');
const PaymentModel = require('./model/payments.model');

var cookieParser = require('cookie-parser')
var bodyParser = require("body-parser");

app.use(cookieParser())
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post("/login",function(req,res){
    UserModel
    .findOne({username:req.body.username,password:req.body.password})
    .then((data)=>{
        console.log("sdfs",data)
        res.cookie('username',req.body.username)
        res.cookie('password',req.body.password)
        res.redirect("/")
    })
    .catch(()=>{
        res.redirect("/loginError.html")
    })
})

app.use(function(req,res,next){
    if(req.cookies.username && req.cookies.password){
        next();
    }
    else{
        res.redirect("/login.html")
    }
})

app.get("/getMyPayments",(req,res)=>{
    PaymentModel.find({username:req.cookies.username})
    .then(data=>res.send(data))
    .catch(err=>res.send(err))
})

app.get("/",(req,res)=>{
    
res.redirect("Home.html")
})
app.get("/getHeroes",function(req,res){
    console.log(req.cookies)
    res.send("Chiru,balayya")
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