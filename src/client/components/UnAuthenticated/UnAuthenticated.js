import React, { Component, Fragment } from 'react'
import axios from 'axios'

import styles from './unauthenticated-styles.scss'

class UnAuthenticated extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>
          <strong className={styles.alert}>Un</strong>Authenticated User
        </h1>
      </div>
    )
  }
}

export default UnAuthenticated
