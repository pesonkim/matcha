const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)
require('./socket')(server)

server.listen(config.PORT, () => {
	logger.info(`Server running on ${config.IP}:${config.PORT}`)
})
