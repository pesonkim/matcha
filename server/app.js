const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const setupDb = require('./utils/setup')

const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const verifyRouter = require('./routes/verify')
const resetRouter = require('./routes/reset')
const tagsRouter = require('./routes/tags')

const middleware = require('./utils/middleware')

setupDb()

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/users', userRouter)
app.use('/login', loginRouter)
app.use('/verify', verifyRouter)
app.use('/reset', resetRouter)
app.use('/tags', tagsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
