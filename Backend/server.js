const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors')
app.use(cors({ credentials: true }))

mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())
const userRouter = require('./routes/user')
app.use('/user', userRouter)


app.listen(7000, () => console.log("Server started"))
