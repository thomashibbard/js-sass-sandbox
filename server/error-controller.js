const chalk = require('chalk')

const logError = (error, req, res, next) => {
  console.log(chalk.red('ERR_API', req.method, error.stack))
  next(error)
}

const handleError = (error, req, res, next) => {
  res.status(500).send('ERR_API')
}

module.exports = { logError, handleError }
