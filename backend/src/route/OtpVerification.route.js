const express = require('express');
const { sendOtp, verifyOtp } = require('../controller/OtpVerification.controller')

const router = express.Router();
/**
 * Router to route the api
 */
router.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const createdOtp = await sendOtp({
            email
        });
        res.status(200).json(createdOtp);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const validOtp = await verifyOtp({ email, otp });
        res.status(200).json({ valid: validOtp });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;