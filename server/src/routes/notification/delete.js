const router = require('express').Router()
const Notification = require('../../models/Notification')
const { isEmpty } = require('../../utils')
const { ERRORS } = require('../../config/constants').RESPONSES

router.delete('/delete', (req, res) => {
  if (isEmpty(req.body.notification_id)) return res.status(400).json({ err: ERRORS.DATA_MISSING })
  return new Notification().delete(req.body.notification_id)
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
