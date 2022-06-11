const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const postRouter = require('./api/posts')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/api', postRouter)

mongoose.connect(
	process.env.MONGODB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
	console.log('Success! You are connected to the database my friend.')
)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}, very cool!`))