
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(cookieParser())
// Cors
if (process.env.NODE_ENV ==='development') {
    
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

//Routes
app.get('/api', (req, res)=>{
        res.json({ time:Date().toString()})
})

//port
const port = process.env.PORT  || 9000 

app.listen(port, ()=>{ 
    console.log(`Server is running on port ${port}`)
})