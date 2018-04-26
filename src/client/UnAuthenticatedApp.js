import React, { Component } from 'react'

import UnAuthenticated from './components/UnAuthenticated/UnAuthenticated'

class UnAuthenticatedApp extends Component {
  render() {
    return (
      <div>
        {' '}
        HEY WE ARE SORRY<UnAuthenticated />
      </div>
    )
  }
}

export default UnAuthenticatedApp
