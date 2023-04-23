/**
 * This function generates 6-digit OTP
 * @returns 
 */

exports.generateOtp = async () => {
    try {
        return (otp = `${Math.floor(100000 + Math.random() * 900000)}`)
    } catch (error) {
        if (otp >= Math.floor(1000000 + Math.random() * 9000000)) {
            throw Error(json({ message: 'OTP number cannot be greater than 6 digits!!!' }))
        }
    }
}