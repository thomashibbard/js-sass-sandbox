const express = require('express')
const chalk = require('chalk')
const router = express.Router()
const conversationTrackerRoutes = require('./conversation-tracker')
const campaignTrackerRoutes = require('./campaign-tracker')
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' })
})

router.use('/conversation', conversationTrackerRoutes)
router.use('/campaign', campaignTrackerRoutes)
module.exports = router
