require('./config/db')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
//ROUTES
const authRoutes = require('./routes/auth')

const aluminiRoutes = require('./routes/alumini')
const studentRoutes = require('./routes/student')






//middlewares
app.use(bodyParser.json()) //it is used for parsing the data coming from client side like username email etc
app.use(cookieParser()) //set data in cookies or get data from cookies we use this middle ware
app.use(cors())

//routes
app.get("/",(req,res)=>{
  res.status(200).json({"massage":"Welcome to RestApi"})
})
app.use('/api', aluminiRoutes)
app.use('/api', authRoutes)
 app.use('/api', studentRoutes)




const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`)
})
