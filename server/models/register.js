// const mongoose = require('mongoose')

// const registerSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     role: {
//         type: String,
//         default: "user"
//     }
// })

// const registerModel = mongoose.model( "user", registerSchema)
// module.exports = registerModel
const mongoose = require('mongoose')
const registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    },
    failedLoginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false  // Users must verify email after registering
    },
    otp: String,
    otpExpires: Date

});

const registerModel = mongoose.model( "user", registerSchema)
 module.exports = registerModel