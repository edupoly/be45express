const express = require('express')
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname+"/public"))
var c = 0;
io.on('connection', (socket) => {
    c++;
    console.log(socket.id+"::connected");
    io.emit("currentviewers",c)
    socket.on("disconnect",()=>{
        c--;
        console.log(socket.id+"::disconnected");
        io.emit("currentviewers",c)
    })
});

server.listen(4000);