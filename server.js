// require('babel-register')({
//   presets: ['react'],
//   plugins: ['babel-plugin-transform-class-properties']
// })
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const _ = require('lodash')
const express = require('express')
const chalk = require('chalk')
const webpack = require('webpack')
const path = require('path')
const requireFromString = require('require-from-string')
const MemoryFS = require('memory-fs')
// const serverConfig = require('./config/server.production.js')
const fs = require('fs')
// const App = require('client/App').default
const Root = require('components/Root').default
const Authenticated = require('components/Authenticated/Authenticated').default
const UnAuthenticated = require('components/UnAuthenticated/UnAuthenticated')
  .default

const server = express()

const baseTemplateAuthenticated = fs.readFileSync(
  path.resolve(process.cwd(), 'dist', 'index.html'),
  'utf8'
)
const baseTemplateUnAuthenticated = fs.readFileSync(
  path.resolve(process.cwd(), 'dist', 'index.html'),
  'utf8'
)

server.use('/dist', express.static(path.resolve(process.cwd(), 'dist')))
server.use(
  '/scripts',
  express.static(path.resolve(process.cwd(), 'dist', 'scripts'))
)
server.use('/css', express.static(path.resolve(process.cwd(), 'dist', 'css')))

server.get('/', (request, response, next) => {
  if (process.env.NODE_ENV === 'production') {
    const template = _.template(baseTemplate)

    const html = ReactDOMServer.renderToString(
      React.createElement(Root, null, React.createElement(Authenticated))
    )

    const compiledHTML = template({ html })
    response.header(
      'Cache-Control',
      'private, no-cache, no-store, must-revalidate'
    )
    response.header('Expires', '-1')
    response.header('Pragma', 'no-cache')
    response.send(compiledHTML)
  }
  next()
})

server.use('/dist', express.static(path.resolve(process.cwd(), 'dist')))

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
