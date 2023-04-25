const Express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const otpRoutes = require('./src/route/OtpVerification.route')

const app = Express();
env.config()

//DB Connection
mongoose.connect(`mongodb+srv://purplemoon:${process.env.MONGOBD_PASSWORD}@cluster0.yarde8a.mongodb.net/test`)
    .then(() => {
        console.log(`Database connected successfully`)
    })

// Parsing and connecting api to frontend
app.use(Express.json())
app.use(cors({
    origin: `${process.env.corsOrigin}`
}));

//Route
app.use('/api', otpRoutes);

//Created Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})
