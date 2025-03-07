var express = require('express')
var router = express.Router()
var PlayerModel = require('../model/players.model')
router.get("/getAllPlayers",(req,res)=>{
    PlayerModel.find({}).then(players=>{
        res.send(players)
    })
})

router.post("/addPlayer",(req,res)=>{
    var newPlayer = new PlayerModel(req.body);
    newPlayer.save();
    res.send("ipoindi")
})

module.exports=router