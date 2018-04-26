const chalk = require('chalk')

// const logError = (error, req, res, next) => {
//   const logDetails = Object.assign({}, error.details, {
//     httpMethod: req.method,
//     originalUrl: req.originalUrl
//   })
//   console.log(chalk.red('ERR_API', JSON.stringify(logDetails, null, 2)))
//   next(error)
// }

// const handleError = (error, req, res, next) => {
//   res.status(500).send('ERR_API')
// }

// module.exports = { logError, handleError }

const logError = (error, req, res, next) => {
  console.error(chalk.red('error >>>>', error))
  next(error)
}
const handleError = (error, req, res, next) => {
  res.status(500).json({ status: 'ERROR' })
  next()
}

module.exports = { logError, handleError }
