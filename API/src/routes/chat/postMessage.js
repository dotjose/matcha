const router = require('express').Router()
const Chat = require('../../models/Chat')
const Notification = require('../../models/Notification')
const { isEmpty } = require('../../utils')
const { ERRORS } = require('../../config/constants').RESPONSES

router.post('/message', (req, res) => {
  if (isEmpty(req.body.emitter) || isEmpty(req.body.receiver) || isEmpty(req.body.message)) {
    return res.status(400).json({ err: ERRORS.DATA_MISSING })
  }
  return new Chat().addMessage(req.body.emitter, req.body.receiver, req.body.message)
    .then(() => new Notification().message(req.body.emitter, req.body.receiver))
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
