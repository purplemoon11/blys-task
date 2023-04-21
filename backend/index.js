const Express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')

const app = Express();
env.config()
app.use(Express.json())

mongoose.connect(`mongodb+srv://purplemoon:${process.env.MONGOBD_PASSWORD}@cluster0.yarde8a.mongodb.net/test`)
    .then(() => {
        console.log(`Database connected successfully`)
    })

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})