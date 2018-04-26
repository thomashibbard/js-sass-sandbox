import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import Authenticated from './components/Authenticated/Authenticated'
import UnAuthenticated from './components/UnAuthenticated/UnAuthenticated'

const App = props => (
  <Root>
    <Authenticated />
  </Root>
)

ReactDOM.render(<App />, document.getElementById('app'))

export default App
