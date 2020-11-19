
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const blogRoutes = require('./routes/blog')

const app = express()
//DB

mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false, useUnifiedTopology:true}).then(()=>{
    console.log('DB Connected.')
})

//middlewares
app.use(morgan('dev'))
app.use(cookieParser())
// Cors
if (process.env.NODE_ENV ==='development') {
    
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

// Routes middleware
app.use('/api',blogRoutes)
//port
const port = process.env.PORT  || 9000 

app.listen(port, ()=>{ 
    console.log(`Server is running on port ${port}`)
})