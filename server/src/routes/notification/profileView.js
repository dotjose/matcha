const router = require('express').Router()
const Notification = require('../../models/Notification')
const { isEmpty } = require('../../utils')

router.post('/see-profile', (req, res) => {
  if (isEmpty(req.body.emitter) || isEmpty(req.body.receiver)) res.status(400).send({ err: 'Missing argument.' })
  return new Notification().profileView(req.body.emitter, req.body.receiver)
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router