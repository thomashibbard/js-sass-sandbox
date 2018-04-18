import React, { Component, Fragment } from 'react'
import axios from 'axios'
import styles from '../styles/index.scss'

const payload = [
  {
    type: 'INTEREST',
    posts: false,
    max_posts: 10,
    timeline_type: 'MAP',
    hourly_timeline: false,
    daily_timeline: true,
    interest: 1014102,
    dataview: 7777,
    start: '2017-08-30T0:00:00',
    end: '2018-04-17T0:00:00'
  },
  {
    type: 'INTEREST',
    posts: false,
    max_posts: 10,
    timeline_type: 'MAP',
    hourly_timeline: false,
    daily_timeline: true,
    interest: 1020246,
    dataview: 7777,
    start: '2017-08-30T0:00:00',
    end: '2018-04-17T0:00:00'
  },
  {
    type: 'INTEREST',
    posts: false,
    max_posts: 10,
    timeline_type: 'MAP',
    hourly_timeline: false,
    daily_timeline: true,
    interest: 1019822,
    dataview: 7777,
    start: '2017-08-30T0:00:00',
    end: '2018-04-17T0:00:00'
  },
  {
    type: 'INTEREST',
    posts: false,
    max_posts: 10,
    timeline_type: 'MAP',
    hourly_timeline: false,
    daily_timeline: true,
    interest: 932742,
    dataview: 7777,
    start: '2017-08-30T0:00:00',
    end: '2018-04-17T0:00:00'
  },
  {
    type: 'INTEREST',
    posts: false,
    max_posts: 10,
    timeline_type: 'MAP',
    hourly_timeline: false,
    daily_timeline: true,
    interest: 771021,
    dataview: 7777,
    start: '2017-08-30T0:00:00',
    end: '2018-04-17T0:00:00'
  },
  {
    type: 'INTEREST',
    posts: false,
    max_posts: 10,
    timeline_type: 'MAP',
    hourly_timeline: false,
    daily_timeline: true,
    interest: 1010913,
    dataview: 7777,
    start: '2017-08-30T0:00:00',
    end: '2018-04-17T0:00:00'
  }
]

class Child extends Component {
  constructor() {
    super()
    this.state = {
      json: ''
    }
  }
  componentDidMount() {
    axios
      .post('./api/interests', payload)
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
