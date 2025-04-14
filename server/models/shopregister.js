const mongoose = require('mongoose')

const shopregisterSchema = new mongoose.Schema({
    shopname: String,
    address: String,
    contact: Number,
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "shop"
    },
    image: String, // filename of uploaded image

})

const shopregisterModel = mongoose.model( "shop", shopregisterSchema)
module.exports = shopregisterModel