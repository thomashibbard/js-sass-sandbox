import React, { Component } from 'react'
import Authenticated from './Authenticated/Authenticated'
import UnAuthenticated from './UnAuthenticated/UnAuthenticated'
import styles from '../common-assets/styles/index.scss'

const Root = props => <section>{props.children}</section>

export default Root
