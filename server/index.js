const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const path = require('path')

const rootController = require('./controller')
const errorController = require('./error-controller')
const PORT = 8081

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(path.resolve(process.cwd(), 'public')))
app.use('/scripts', express.static(path.resolve(process.cwd(), 'dist/scripts')))

/* log all http */
app.all('*', rootController.logHttp)

/* root traffic */
app.get('/', rootController.handleRoot)
app.get('/', rootController.logRootDone)

/* routes */
app.get('/xhr', rootController.handleXhr)

/* error logging, handling */
app.use(errorController.logError)
app.use(errorController.handleError)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
