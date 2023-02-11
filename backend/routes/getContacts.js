const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = 'RESTAPI'
const route=express.Router()

route.use(express.json());

const data=require("../models/Contact")
const cors = require("cors");
//route.use(cors());
route.get("/" , cors(),async(req,res)=>{
    try{
    const info= await data.find()
    res.status(200).json({
        status:"passed",
        info,
        user:req.user
    })
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

route.get('/new', (req, res)=>{
    res.send({
        status:"Working"
    })
})
// route.get("/search", async(req,res)=>{
//      const search= await data.find()
// })

module.exports=route;