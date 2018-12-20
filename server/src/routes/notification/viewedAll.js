const router = require('express').Router()
const Notification = require('../../models/Notification')
const { isEmpty } = require('../../utils')

router.put('/viewed-all', (req, res) => {
  if (isEmpty(req.body.user_id)) res.status(400).send({ err: 'Missing argument.' })
  const notification = new Notification()
  return notification.viewedAll(req.body.user_id)
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
