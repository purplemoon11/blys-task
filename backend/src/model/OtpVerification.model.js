const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    otp: { type: String },
})

module.exports = mongoose.model('Otp', otpSchema);