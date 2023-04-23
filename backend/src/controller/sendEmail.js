const nodemailer = require('nodemailer');
const env = require('dotenv')
env.config();

//Mail of sender is stored in here and created
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
};
const transporter = nodemailer.createTransport(smtpConfig);

//Verified if there is any error or success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log(success);
    }
})

//Mail is sent
const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        throw error;
    }
}

module.exports = sendEmail;