const express = require('express')
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname+"/public"))
var score={
    BRZ:0,
    IND:0
};
io.on('connection', (socket) => {
    // socket.emit("updatescore",{...score})
    socket.on('brazilgoal',()=>{
        score.BRZ++
        console.log(score);
        io.emit("updatescore",{...score})
    })
    socket.on('indiagoal',()=>{
        score.IND++
        io.emit("updatescore",{...score})
    })
});

server.listen(4000);