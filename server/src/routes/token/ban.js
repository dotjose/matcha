const router = require('express').Router()
const JsonWebToken = require('../../models/JsonWebToken')
const { isEmpty } = require('../../utils')

router.post('/ban', (req, res) => {
  if (isEmpty(req.body.token)) return res.sendStatus(403)
  return new JsonWebToken().delete(req.body.token)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(403))
})

module.exports = router