var express = require('express')
var app = express();

var cors = require("cors")
const mongoose = require('mongoose');
var jwt = require("jsonwebtoken")
const UserModel = require('./model/users.model');
const PaymentModel = require('./model/payments.model');
var bodyParser = require("body-parser");

const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{
    origin:'http://localhost:3000'
}});

const mongoUri = "mongodb+srv://rb42:hello123@cluster0.eitlw5l.mongodb.net/Rb42?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUri)

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post("/signup",function(req,res){
    var newuser = new UserModel(req.body);
    newuser.save();
    res.send({msg:"SIGNUP_SUCCESS"})
})

app.get("/getDetailsByToken",(req,res)=>{
    try{
      var x = jwt.verify(req.headers.token,"evaddiki cheppaku")
      res.send({msg:"UPDATED",username:x.username,role:x.role,token:req.headers.token})
    }
    catch(e){
      res.send({msg:"ERROR"})
    }
  })

app.post("/login",function(req,res){
    UserModel
    .findOne({username:req.body.username,password:req.body.password})
    .then((data)=>{
        console.log("sdfs",data)
        var token = jwt.sign(req.body,"evaddiki cheppaku")
        res.send({msg:"SUCCESS",username:req.body.username,role:'user',token})
    })
    .catch(()=>{
        res.send({msg:'Chisukomari'})
    })
})

io.on('connection', (socket) => {
    socket.on('message',(data)=>{
        io.emit("chat",{msg:data.msg,username:data.user})
    })
    socket.on("updateUserStatus",(details)=>{
        UserModel.findOneAndUpdate({username:details.username},{status:details.status,socketid:socket.id}).then((a)=>{
            io.emit("updateUserStatus",{username:details.username,status:details.status,socketid:socket.id})
        }).catch(e=>console.log(e))
    })
    socket.on("disconnect",()=>{
        UserModel.findOneAndUpdate({socketid:socket.id},{status:"offline",socketid:""}).then((a)=>{
            // console.log(a);
            io.emit("updateUserStatus",{username:a.username,status:"offline",socketid:""})
        }).catch(e=>console.log(e))
    })
    socket.on("personalMessage",(details)=>{
        console.log("personalMsg",details);
        socket.to(details.receiver).emit("receivedMsg",{message:"HI",sender:socket.id,username:details.username})
    })
});
function checkAuth(req,res,next){
    try{
        var x = jwt.verify(req.headers.token,"evaddiki cheppaku")
        next()
    }
    catch(e){
        res.send({msg:"ERROR"})
    }
}
app.get("/getMyPayments",checkAuth,(req,res)=>{
    PaymentModel.find({username:req.cookies.username})
    .then(data=>res.send(data))
    .catch(err=>res.send(err))
})
app.get("/getAllUsers",checkAuth,(req,res)=>{
    UserModel.find({}).then((users)=>{res.send(users)})
})
server.listen(4140,()=>console.log("server running on 4140"))
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