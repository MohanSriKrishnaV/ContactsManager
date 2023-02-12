const express = require("express");
const route = express.Router()

route.use(express.json());

const data = require("../models/Contact")
const cors = require("cors");
//route.use(cors());
route.get("/", cors(), async (req, res) => {
    try {


        const info = await data.find({user : req.user})
        res.status(200).json({
            status: "passed",
            info,
            
        })
    }
    catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})


// route.get("/search", async(req,res)=>{
//      const search= await data.find()
// })

module.exports = route;