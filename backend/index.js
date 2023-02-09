const express = require("express");
const mongoose = require("mongoose");
const app = express();

const  getContacts= require("./routes/getContacts")
app.use("/getcontacts", getContacts)


const bcrypt = require("bcrypt");
const port = 8086;
app.use(express.json());

const url = `mongodb+srv://admin:admin@cluster0.kzqiv0i.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connection successful")
    }
})

app.listen(port, () => console.log(`App listening to port ${port}`))