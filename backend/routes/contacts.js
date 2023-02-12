const express = require("express");
const fs = require("fs");
const route = express.Router();
route.use(express.json());
const path = require("path");
const csv = require('csvtojson');
const { JsonWebTokenError } = require("jsonwebtoken");
const fileUpload = require('express-fileupload');
route.use(fileUpload());
const contact = require("../models/Contact");
const user = require("../models/User")
const bodyParser = require("body-parser");
const cors = require("cors");
route.use(cors());
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({ extended: false }))


route.post("/",  async (req, res) => {
    const x = req.data
    console.log(x)
    console.log(req.user);
    const { file } = req.files;
    // console.log(auth_user);
    file.mv(`./files/${file.md5}.csv`, async (err) => {
        if (err) {
            res.status(400).json({
                status: "errror",
                message: err.message
            })
        }
        else {
            try {
                let array = [];
                const csvfilepath = path.join(__dirname, "..", "files", `${file.md5}.csv`);
                const jsonArray = await csv().fromFile(csvfilepath);
                for (let i = 0; i < jsonArray.length; i++) {
                    // console.log(x)
                    // console.log(req.user);
                    let data = await contact.create({
                        name: jsonArray[i].name, designation: jsonArray[i].designation,
                        company: jsonArray[i].company,
                        industry: jsonArray[i].industry,
                        email: jsonArray[i].email,
                        phone: jsonArray[i].phone,
                        country: jsonArray[i].country,
                        user : req.user
                    });
                }

                res.status(200).json({ status: "success"});

                fs.unlink(path.join(__dirname, "..", "files", `${file.md5}.csv`), (err) => {
                    console.log(err);
                })



            } catch (e) {
                res.status(400).json({
                    status: "error",
                    message: e.message
                })
            }
        }
    })
})



route.delete("/", async (req, res) => {

    try {
        const datas = req.body;
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            const deleted_data = await contact.deleteOne({ _id: data.id })
        }
        res.status(200).json({
            message: "deleted"
        })

    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
})


route.delete("/contact", async (req, res) => {
    try {
        const data = req.body;
        const deleted_contact = await contact.deleteOne({ _id: data.id });
        const updated_list = await contact.find();
        res.status(200).json({
            updated_list
        })

    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
})


route.delete("/:contact", async (req, res) => {
    try {
        const data = req.params.contact.split(":")[1];
        const deleted_contact = await contact.deleteOne({ _id: data });
        const updated_list = await contact.find();
        res.status(200).json({
            updated_list
        })

    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
})

module.exports = route;