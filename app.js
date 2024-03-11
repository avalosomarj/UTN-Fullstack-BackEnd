const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

const productRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static('public'))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

app.listen(PORT, () => {
    console.log("Server running at " + process.env.URL_API + PORT + "/")
})