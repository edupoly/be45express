var express = require("express");
var app = express();
var cors = require('cors')
var bodyParser = require("body-parser");
app.use(cors());
const multer  = require('multer')
var fs = require('fs')
const upload = multer({ dest: 'uploads/' })
// app.use(cors({
//     origin: ['http://127.0.0.1:5501','http://127.0.0.1:8080'],
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }));
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
var studentRouter = require('./routes/student.route')
var employeeRouter = require("./routes/employee.route")
app.set("view engine","pug")
app.use("/student",studentRouter)
app.use("/employee",employeeRouter)


app.post("/uploadFile",upload.single('profilepic'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    fs.rename(req.file.path,req.file.destination+req.file.originalname,function(a,b){
        console.log(a,b)
    })
    res.send({message:"Lets see what happens"})
})

app.get("/",function(req,res){
    console.log("Request received /")
    res.send("Bagunnava")
})
app.get("/myfile",(req,res)=>{
    res.redirect("/abc")
    // res.sendFile(__dirname+"/customhooks.docx")
})
function mif(req,res,next){
    console.log("mif middleware")
    next()
}
function mlf(req,res,next){
    console.log("mlf middleware")
    next();
}
app.get("/abc",mif,mlf,function(req,res){
    console.log("Request received for abc")
    res.send({message:"istha undi"})
})
app.get("/add/:a/:b",function(req,res){
    var s = +req.params.a + +req.params.b;
    res.send(JSON.stringify(s))
})
app.post("/cal/add",function(req,res){
    console.log(req.body)
    res.send("Agu")
})
app.listen(4000,()=>{console.log("Server Running on:: 4000")})