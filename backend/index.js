const express = require("express");
const mongoose = require("mongoose");
const app = express();
const getContacts = require("./routes/getContacts")
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8086;

const registrationRoute = require('./routes/registration')
const loginRoute = require('./routes/login');
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// fileUpload = require('express-fileupload');
const contacts = require("./routes/contacts");
const jwt = require('jsonwebtoken');
const user = require('./models/User');
const secret = "RESTAPI"



//app.use(fileUpload());
app.use('/api', registrationRoute);
app.use('/api', loginRoute)



const url = `mongodb+srv://admin:admin@cluster0.kzqiv0i.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connection successful")
    }
})


app.use("/contacts", (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, secret, function (err, decode) {
            if (err) {
                return res.status(403).json({
                    status: "Failed",
                    message: "Invalid token"
                })
            }
            console.log(decode)
            req.user = decode.data;
            next();
        })

    } else {
        res.status(403).json({
            status: "Failed",
            message: "User is not authenticated"
        })
    }
})
app.use("/contacts", getContacts)
app.use("/contacts", contacts);




app.listen(port, () => console.log(`App listening to port ${port}`))