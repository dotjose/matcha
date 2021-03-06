const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { isEmpty } = require('../../utils')
const { ERRORS } = require('../../config/constants').RESPONSES
const { JWT } = require('../../config/config')

const create = data => (
  new Promise((resolve, reject) => {
    jwt.sign(data, JWT.SECRET, { expiresIn: '365d' }, (err, token) => {
      if (!isEmpty(err)) return reject(err)
      return resolve(token)
    })
  })
)

router.post('/', (req, res) => {
  if (isEmpty(req.body.data)) return res.status(400).json({ err: ERRORS.DATA_MISSING })
  return create(req.body.data)
    .then((token) => {
      if (isEmpty(token)) return res.json({ err: ERRORS.GENERAL })
      return res.json({ token, createdAt: Date.now(), expireAt: Date.now() + JWT.DURATION * 1000 })
    })
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
