const router = require('express').Router()
const chalk = require('chalk')

router.get('/', (reqest, response, next) => {
  response.json({ module: 'conversation' })
  next()
})

module.exports = router
