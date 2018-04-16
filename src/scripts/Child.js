import React, { Component, Fragment } from 'react'
import axios from 'axios'
import styles from '../styles/index.scss'

class Child extends Component {
  constructor() {
    super()
    this.state = {
      json: ''
    }
  }
  componentDidMount() {
    axios
      .get('./xhr')
      .then(({ data }) => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Logging Test</h1>
      </div>
    )
  }
}

export default Child
