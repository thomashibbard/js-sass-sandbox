import React, { Component, Fragment } from 'react'
import styles from './styles/index.scss'

class Child extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Lorem Ipsum</h1>
        <h3 className={styles.subhead}>Hello World</h3>
      </div>
    )
  }
}

export default Child
