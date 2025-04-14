const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
})

const registerModel = mongoose.model( "user", registerSchema)
module.exports = registerModel