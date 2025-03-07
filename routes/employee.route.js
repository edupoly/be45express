var express= require('express');
var router = express.Router();

router.get("/",(req,res)=>{
    res.send("Reached to Employee Router File")
})
router.get("/getAllEmployees",(req,res)=>{
    res.send("React to Employee/getAllEmployees Route in Employee Router File")
})
module.exports = router;