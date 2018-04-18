const assert = require('assert')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
const circularJson = require('circular-json')

const logRoot = (req, res, next) => {
  console.log(chalk.blue('LOG_ROOT_ACCESS'))
  next()
}

const handleRoot = (req, res, next) => {
  console.log(chalk.blue('SENDING_ROOT'))
  const options = {
    root: path.resolve(process.cwd(), 'dist'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile('index.html', options, error => {
    if (error) {
      next(error)
    } else {
      next()
    }
  })
}

const logRootDone = (req, res, next) => {
  console.log(chalk.blue('ROOT_SENT_SUCCESSFULLY'))
}

class ContractError extends Error {
  constructor(error, payload, message) {
    super()
    this.details = {
      message,
      stack: error.stack,
      payload: payload
    }
  }
}

/*
* Request interest data from rest search. Arguments:
*
*   type                   string
*
*   posts                  boolean
*
*   max_posts              number
*
*   timeline_type          string
*
*   hourly_timeline        boolean
*                            whether the returned data should be in hourly increments
*
*   daily_timeline         boolean
*                            whether the returned data should be in daily increments
*
*   interest               number
*                            id of interests for rest search query
*
*   dataview               number
*                            id of dataview for rest search query
*
*   start                  string
*                            string representation of start date
*                            in the format 2017-07-30T0:00:00
*
*   end                    string
*                            string representation of end date
*                            in the format 2017-08-30T0:00:00
*
*/
const CONTRACT_VALIDATION_ERROR = 'CONTRACT_VALIDATION_ERROR'
const handleXhr = (req, res, next) => {
  const payload = req.body
  try {
    validatePayload(payload)
    res.json({ data: 'some data' })
  } catch (caughtError) {
    const error = new ContractError(
      caughtError,
      payload,
      CONTRACT_VALIDATION_ERROR
    )
    next(error)
  }
}

const validatePayload = payload => {
  const kairosDateFormatRe = /^\d{4}\-\d{2}\-\d{2}T\d\:\d{2}\:\d{2}$/
  // const KAIROS_DATE_REGEX = /^\d{4}\-\d{2}\-\d{2}T0\:00:00$/
  payload.forEach(interest => {
    assert.equal(typeof interest.type, 'string')
    assert.equal(typeof interest.posts, 'boolean')
    assert.equal(typeof interest.max_posts, 'number')
    assert.equal(typeof interest.timeline_type, 'string')
    assert.equal(typeof interest.hourly_timeline, 'boolean')
    assert.equal(typeof interest.daily_timeline, 'boolean')
    assert.equal(typeof interest.interest, 'number')
    assert.equal(typeof interest.dataview, 'number')
    assert.equal(typeof interest.start, 'string')
    assert.equal(typeof interest.end, 'string')
    assert.ok(kairosDateFormatRe.test(interest.start))
    assert.ok(kairosDateFormatRe.test(interest.end))
    assert.equal(
      !interest.daily_timeline,
      interest.hourly_timeline,
      'ERROR_HOURLY_DAILY_TIMELINES_NOT_INVERSE'
    )
  })
}

const logHttp = (req, res, next) => {
  console.log(chalk.blue('LOG_HTTP_ACCESS ::', req.method), req.originalUrl)
  next()
}

const handleNotFound = (req, res, next) => {
  // next(new Error('ERR_NOT_FOUND'))
}

module.exports = {
  logHttp,
  logRoot,
  handleRoot,
  logRootDone,
  handleXhr,
  handleNotFound
}
