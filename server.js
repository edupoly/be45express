var express =require('express');
var app = express();

const mongoUri = "mongodb+srv://rb42:hello123@cluster0.eitlw5l.mongodb.net/Rb42?retryWrites=true&w=majority&appName=Cluster0"
const mongoose = require('mongoose');
mongoose.connect(mongoUri)

const UnicornModel = require('./model/unicorns.model')

var bodyParser = require("body-parser")
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
var playerRoute = require('./routes/player.route')

app.use('/player',playerRoute)
app.get("/",(req,res)=>res.send("HE"))

app.get("/getUnicornsByGender/:gender",function(req,res){
    UnicornModel.find({gender:req.params.gender}).then((data)=>{
        res.json(data)
    })
})
app.listen(4000,()=>console.log("Running on 4000"))