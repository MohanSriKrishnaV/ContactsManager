const express = require("express");
const router = express.Router();
const user = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = 'RESTAPI'

router.post('/login', async (req, res)=>{
    try{
        console.log(req.body);
        const { email, password } = req.body;
        const user_obj = await user.findOne({ email });
        console.log(user_obj)
        if(!user_obj){
            return res.status(400).json({
                status: "Failed",
                message: "User not registered"
            })
        }
        bcrypt.compare(password, user_obj.password, (err, result)=>{
            if(err){
                return res.status(400).json({
                    status:"Failed",
                    message:err.message
                })
            }
            if(result){
                const {_id, email} = user_obj
                const token = jwt.sign({
                    // exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user_obj._id
                  }, secret);

                return res.json({
                    status:"Success",
                    message:"Login Successful",
                    token,
                    user: {_id, email}
                })
            }else{
                return res.status(400).json({
                    status:"Failed",
                    message:"Invalid credentials"
                })
            }
        })

    } catch(e){
        return res.status(500).json({
            status:"Failed",
            message:e.message
        })
    }
})


module.exports = router