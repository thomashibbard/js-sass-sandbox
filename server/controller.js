const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
const circularJson = require('circular-json')

const logHttp = (req, res, next) => {
  console.log(chalk.blue('LOG_HTTP_ACCESS ::', req.method), req.originalUrl)
  next()
}

const logRoot = (req, res, next) => {
  console.log(chalk.blue('LOG_ROOT_ACCESS'))
  next()
}

const handleRoot = (req, res, next) => {
  console.log(chalk.blue('SENDING_ROOT'))
  const options = {
    root: path.resolve(process.cwd(), 'dist'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile('index.html', options, error => {
    if (error) {
      next(error)
    } else {
      next()
    }
  })
}

const logRootDone = (req, res, next) => {
  console.log(chalk.blue('ROOT_SENT_SUCCESSFULLY'))
}

const handleXhr = (req, res, next) => {
  // fake xhr error
  res.json({ some: 'json' })
}

module.exports = {
  logHttp,
  logRoot,
  handleRoot,
  logRootDone,
  handleXhr
}
