require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileupload = require('express-fileupload')
const cookieparser = require('cookie-parser')
const { Router } = require('express')

const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors())
app.use(fileupload(
    {
        useTempFiles : true
    }
))

// route
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productRouter'))
app.use('/api/stripe',require('./routes/stripe'))

// connect to mongo
mongoose.connect(process.env.database_uri).
then(()=>{
    app.listen(process.env.port,()=>{
        console.log('listening on port', process.env.port)
    })
}).
catch((err)=>{
    console.log(err)
})