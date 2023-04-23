const OTP = require("../model/OtpVerification.model");
const { generateOtp } = require("./generateOtp.controller");
const sendEmail = require('./sendEmail');
const { hashData, verifyHashedData } = require("./hashOtp.controller");
const env = require('dotenv')
env.config();

exports.sendOtp = async ({ email }) => {
    try {
        //validation to check if email is empty
        if (!(email)) {
            throw Error('Email cannot be empty!!!');
        }

        //every time new otp is sent old is deleted
        await OTP.deleteOne({ email });
        //generate otp
        const generatedOtp = await generateOtp();
        //Body for the mail
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            html: `<p>${'Verify your email with code below'}</p><p style="color:red; font-size: 25px; letter-spacing:2px;"><b>${generatedOtp}</b></p>`,
        };
        await sendEmail(mailOptions);

        //Otp is hashed and sent
        const hashedOtp = await hashData(generatedOtp);
        const newOtp = await new OTP({
            email,
            otp: hashedOtp
        });
        const createdOtpRecord = await newOtp.save();
        return createdOtpRecord;

    } catch (error) {
        throw error;
    }
}

exports.verifyOtp = async ({ email, otp }) => {
    try {
        if (!(email && otp)) {
            throw Error('Email and otp cannot be emptied');
        }
        const matchedOtp = await OTP.findOne({ email });
        if (!matchedOtp) {
            throw Error("No otp record found");
        }
        const hashedOtp = matchedOtp.otp;
        const validOtp = await verifyHashedData(otp, hashedOtp);
        return validOtp;
    } catch (error) {
        throw error;
    }
}
