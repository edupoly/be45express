const express = require('express')
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname+"/public"))

io.on('connection', (socket) => {
    socket.on('message',(data)=>{
        io.emit("chat",{msg:data.msg,username:data.user})
    })
});

server.listen(4000);