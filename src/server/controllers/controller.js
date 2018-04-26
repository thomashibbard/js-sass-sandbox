const assert = require('assert')
const Joi = require('joi')
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
  next()
}

class ContractError extends Error {
  constructor(error, payload, message) {
    super(message)
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
  // const [payload] = req.body
  // try {
  //   validatePayload(payload)
  //   res.json({ data: 'some data' })
  // } catch (caughtError) {
  //   const error = new ContractError(
  //     caughtError,
  //     payload,
  //     CONTRACT_VALIDATION_ERROR
  //   )
  //   next(error)
  // }

  // type: 'INTEREST',
  // posts: false,
  // max_posts: 10,
  // timeline_type: 'MAP',
  // hourly_timeline: false,
  // daily_timeline: true,
  // interest: 1014102,
  // dataview: 7777,
  // start: '2017-08-30T0:00:00',
  // end: '2018-04-17T0:00:00'
  const kairosDateFormatRe = /^\d{4}\-\d{2}\-\d{2}T\d\:\d{2}\:\d{2}$/
  const payload = require('../__mocks__/request')
  const [payloadHead] = payload
  const schema = Joi.object().keys({
    type: Joi.string(),
    posts: Joi.boolean(),
    max_posts: Joi.number(),
    timeline_type: Joi.string(),
    hourly_timeline: Joi.boolean(),
    daily_timeline: Joi.boolean(),
    interest: Joi.number(),
    dataview: Joi.number(),
    start: Joi.string().regex(kairosDateFormatRe),
    end: Joi.string().regex(kairosDateFormatRe)
  })
  const joiOptions = {
    abortEarly: false
  }
  const payloadValidation = Joi.validate(payloadHead, schema, joiOptions)
  const payloadIsValid = !payloadValidation.error
  console.log({ payloadIsValid })
  if (!payloadIsValid) {
    return next(payloadValidation.error)
  }
  res.json(require('../__mocks__/response'))
}

const logHttp = (req, res, next) => {
  console.log(chalk.blue('LOG_HTTP_ACCESS ::', req.method), req.originalUrl)
  next()
}

const handleNotFound = (req, res, next) => {
  // next(new Error('ERR_NOT_FOUND'))
  next()
}

module.exports = {
  logHttp,
  logRoot,
  handleRoot,
  logRootDone,
  handleXhr,
  handleNotFound
}
