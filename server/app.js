const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
//const setupDb = require('./utils/setup')

const exampleRouter = require('./routes/example')
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')

const middleware = require('./utils/middleware')

//setupDb()

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/example', exampleRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
