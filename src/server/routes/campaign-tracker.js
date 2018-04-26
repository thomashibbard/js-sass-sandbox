const router = require('express').Router()
const chalk = require('chalk')

const anotherFunction = () => {
  console.log(chalk.green('gets called after `next()`'))
}

router.get('/', (reqest, response, next) => {
  response.json({ json: 'data' })
  // return next(new Error('some api error'))
  // anotherFunction()
})

module.exports = router
