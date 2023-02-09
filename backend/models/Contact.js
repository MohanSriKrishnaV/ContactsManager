const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const ContactSchema = new Schema({
    name: { type: String, require: true },
    designation: { type: String, require: true },
    company: { type: String, require: true },
    industry: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    country: { type: String, require: true },
    user: { type: ObjectId, ref: "User" }
}, { timestamps: true })

const Contactmodel = mongoose.model('Contact', ContactSchema);

module.exports = Contactmodel