import React, { Component } from 'react'

import styles from './authenticated-styles.scss'

class Authenticated extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Authenticated User</h1>
      </div>
    )
  }
}

export default Authenticated
