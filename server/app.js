const express = require('express')
require('express-async-errors')
//const fileUpload = require('express-fileupload')
const app = express()
const cors = require('cors')
const setupDb = require('./utils/setup')

const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const verifyRouter = require('./routes/verify')
const resetRouter = require('./routes/reset')
const tagsRouter = require('./routes/tags')
const photosRouter = require('./routes/photos')
const viewsRouter = require('./routes/views')
const likesRouter = require('./routes/likes')
const reportsRouter = require('./routes/reports')
const blocksRouter = require('./routes/blocks')
const messagesRouter = require('./routes/messages')
const notifRouter = require('./routes/notifications')

const middleware = require('./utils/middleware')

setupDb()

app.use(cors())
//app.use(express.static('build'))
app.use(express.static('public'))
app.use(express.json({ limit: '10mb', extended: true }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
//app.use(fileUpload())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/users', userRouter)
app.use('/login', loginRouter)
app.use('/verify', verifyRouter)
app.use('/reset', resetRouter)
app.use('/tags', tagsRouter)
app.use('/photos', photosRouter)
app.use('/views', viewsRouter)
app.use('/likes', likesRouter)
app.use('/reports', reportsRouter)
app.use('/blocks', blocksRouter)
app.use('/messages', messagesRouter)
app.use('/notif', notifRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
