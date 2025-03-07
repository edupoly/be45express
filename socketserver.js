const express = require('express')
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname+"/public"))

io.on('connection', (socket) => {
    socket.emit("greet","Hello ALL")
    socket.on("newmsg",(x)=>{console.log(x)})
    socket.on("connect",()=>{console.log(socket.id+"::connected");})
    socket.on("disconnect",()=>{console.log(socket.id+"::disconnected");})
});

server.listen(4000);