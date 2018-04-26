const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const path = require('path')

const rootController = require('./controllers/controller')
const errorHandling = require('./error-handler')
const PORT = 5010

const app = express()
const router = express.Router()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(path.resolve(process.cwd(), 'public')))
app.use('/scripts', express.static(path.resolve(process.cwd(), 'dist/scripts')))

/* root traffic */
app.get('/', rootController.handleRoot)
app.get('/', rootController.logRootDone)

/* routes */
app.post('/api/interests', rootController.handleXhr)

/* log all http */
// app.all('*', rootController.logHttp, rootController.handleNotFound)

const routers = require('./routes')
app.use('/api', routers)

/* error logging, handling */
app.use(errorHandling.logError)
app.use(errorHandling.handleError)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

process.on('SIGINT', () => {
  console.log('Bye bye!')
  process.exit()
})
