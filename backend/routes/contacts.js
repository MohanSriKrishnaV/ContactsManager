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



route.post("/", async (req, res) => {
    const { file } = req.files;
    file.mv(`./files/${file.md5}.csv`, async (err) => {
        if (err) {
            res.status(400).json({
                status: "errror",
                message: e.message
            })
        }
        else {
            try {
                let array = [];
                const csvfilepath = path.join(__dirname, "..", "files", `${file.md5}.csv`);
                const jsonArray = await csv().fromFile(csvfilepath);
                for (let i = 0; i < jsonArray.length; i++) {
                    let data = await contact.create({
                        name: jsonArray[i].name, designation: jsonArray[i].designation,
                        company: jsonArray[i].company,
                        industry: jsonArray[i].industry,
                        email: jsonArray[i].email,
                        phone: jsonArray[i].phone,
                        country: jsonArray[i].country,
                    });
                }

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
        const deleted_data = await contact.deleteMany();
        res.status(200).json({
            message: deleted
        })

    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message
        })
    }
})



module.exports = route;