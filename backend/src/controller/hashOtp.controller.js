const bcrypt = require("bcrypt");

exports.hashData = async (data, saltRounds = 10) => {
    try {
        const hashData = await bcrypt.hash(data, saltRounds);
        return hashData;
    } catch (error) {
        throw error;
    }
}

exports.verifyHashedData = async (unhashed, hashed) => {
    try {
        const match = await bcrypt.compare(unhashed, hashed);
        return match;
    } catch (error) {
        throw error;
    }
}