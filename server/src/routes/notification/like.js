const router = require('express').Router()
const User = require('../../models/User')
const Notification = require('../../models/Notification')
const { isEmpty } = require('../../utils')

router.post('/like', (req, res) => {
  if (isEmpty(req.body.emitter) || isEmpty(req.body.receiver)) res.status(400).send({ err: 'Missing argument.' })
  const user = new User()
  const notification = new Notification()
  return user.addLike(req.body.emitter, req.body.receiver)
    .then(() => notification.like(req.body.emitter, req.body.receiver))
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err)
      return res.json({ err: err.message })
    })
})

module.exports = router
