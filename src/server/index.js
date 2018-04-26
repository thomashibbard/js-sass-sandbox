require('babel-register')({
  presets: ['react']
})

import React, { createElement } from 'react'
import ReactDOMServer from 'react-dom/server'
import templateFn from './template'
import Root from 'components/Root'
import ChildA from 'components/ChildA/ChildA'
import ChildB from 'components/ChildB/ChildB'

const shouldShowChildA = false
console.log({ shouldShowChildA })
const ConditionalComponent = shouldShowChildA ? ChildA : ChildB

export default (req, res) => {
  const html = ReactDOMServer.renderToString(
    <Root>
      <ConditionalComponent />
    </Root>
  )
  const template = templateFn(html)
  res.send(template)
}
