const router = require('express').Router()
const User = require('../../models/User')
const {
  isEmpty,
  userIsUsername,
  userIsPassword,
} = require('../../utils')
const { ERRORS } = require('../../config/constants').RESPONSES

const dataCheck = (username, password) => (
  userIsUsername(username)
  && userIsPassword(password)
)

router.get('/authenticate', (req, res) => {
  // Check input
  if (isEmpty(req.query.username) || isEmpty(req.query.password)) {
    return res.status(400).json({ err: ERRORS.DATA_MISSING })
  }
  console.log(req.query.username)
  console.log(req.query.password)
  // Check user data
  if (!dataCheck(req.query.username, req.query.password)) {
    return res.status(401).json({ err: ERRORS.DATA_VALIDATION })
  }

  const user = new User()
  return user.fetchInformationByUsernameAndPassword(req.query.username, req.query.password)
    .then(() => user.addIdentificationToken())
    .then(userData => res.json({ user: userData }))
    .catch(err => res.status(401).send({ err: err.message }))
})

module.exports = router
