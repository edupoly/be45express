var express = require('express')
var router = express.Router();
var fs = require('fs')
var students = fs.readFileSync(__dirname+"/students.json")
var allstudents = JSON.parse(students.toString())
router.get("/",(req,res)=>{
    res.send("Student route default home request received to Student router")
})
router.get("/getAllStudents",(req,res)=>{
    res.send("reached to getAllStudents endpoint")
})
router.get("/showstudents",(req,res)=>{
    res.render("table",{students:allstudents})
})
router.post("/addstudent",(req,res)=>{
    console.log(req.body);
    allstudents.push(req.body)
    fs.writeFileSync(__dirname+"/students.json",JSON.stringify(allstudents))
    res.redirect("/student/showstudents")
})
module.exports = router;