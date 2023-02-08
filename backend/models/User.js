const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

const Schema =  mongoose.Schema;

const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email : {type : String, require : true, unique : true},
    password : {type : String, require : true}
}, {timestamps : true})

const Usermodel =  mongoose.model('User', UserSchema);

module.exports = Usermodel;