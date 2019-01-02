const router = require('express').Router()
const User = require('../../models/User')

router.delete('/:id', (req, res) => (
  new User().delete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.json({ err: err.message }))
))

module.exports = router
