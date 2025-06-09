var express = require('express')
var router = express.Router()
var PlayerModel = require('../model/players.model')
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 5, checkperiod: 10 });
// Caching middleware configured for 3 minutes
const cacheMiddleware = (req, res, next) => {
    console.log("Cache middleware");
    const key = req.originalUrl; // Use the full URL as the cache key

    // Try to get data from cache
    const cachedResponse = myCache.get(key);
    if (cachedResponse) {
        console.log(`Cache Hit for: ${key} (serving from memory)`);
        // If data was stored as a string (from JSON.stringify), parse it back
        try {
            return res.send(JSON.parse(cachedResponse));
        } catch (e) {
            // Fallback for non-JSON strings or if parsing fails
            return res.send(cachedResponse);
        }
    }

    // If not in cache, proceed to the route handler
    // Intercept the response to cache it before sending
    const originalJson = res.json;
    res.json = (body) => {
        // Store JSON responses as strings in cache
        myCache.set(key, JSON.stringify(body));
        originalJson.call(res, body); // Send the actual response
    };

    const originalSend = res.send;
    res.send = (body) => {
        // Only cache if it's not a JSON object handled by res.json, and it's a string/Buffer
        if (typeof body === 'string' || Buffer.isBuffer(body)) {
            myCache.set(key, body.toString());
        }
        originalSend.call(res, body);
    };

    next(); // Continue to the route handler
};
router.get("/getAllPlayers",cacheMiddleware,(req,res)=>{
    console.log("entered into route");
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