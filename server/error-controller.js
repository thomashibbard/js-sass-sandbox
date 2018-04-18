const chalk = require('chalk')

const logError = (error, req, res, next) => {
  const logDetails = Object.assign({}, error.details, {
    httpMethod: req.method,
    originalUrl: req.originalUrl
  })
  console.log(chalk.red('ERR_API', JSON.stringify(logDetails)))
  next(error)
}

const handleError = (error, req, res, next) => {
  res.status(500).send('ERR_API')
}

module.exports = { logError, handleError }
