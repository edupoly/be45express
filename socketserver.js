const express = require('express')
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname+"/public"))
var c=0;
io.on('connection', (socket) => {
    c++;
    console.log("connection made",c)
    io.emit("viewerscount",{count:c})
    socket.on("disconnect",()=>{
        c--;
        io.emit("viewerscount",{count:c})
        console.log("connection lost",c)
    })
    
});

server.listen(4000);