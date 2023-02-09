const express = require("express");
const router = express.Router();
const user = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = 'RESTAPI'

router.get('/register', (req, res)=>{
    res.send("Welcome to Registration");
})

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user_obj = await user.findOne({ email });
        if (user_obj) {
            return res.status(409).json({
                status: "Failed",
                message: "User already exist"
            }); ``
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            const data = await user.create({
                email,
                password: hash
            });
            res.json({
                status: "success",
                message: "Registration Successful",
                data
            })
        })
    } catch(e){
        res.status(500).json({
            status:"Failed",
            message:e.message                
        })
    }


})




module.exports = router