var express = require("express")
var app = express();
var session = require('express-session')
var count=0;

app.use(session({secret:"evariki cheppaku"}))

app.get("/",(req,res)=>{
    console.log(req.sessionID)
    if(req.session.count){
        req.session.count++
    }
    else{
        req.session.count=1;
    }
    res.send(`Hello ${req.session.count}`)
})


app.listen(4300,()=>console.log("running on 4300"))