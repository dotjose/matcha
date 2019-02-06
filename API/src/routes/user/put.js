const router = require('express').Router()
const User = require('../../models/User')
const {
  isEmpty,
  isNumeric,
  userIsBirthdate,
  userIsFirstname,
  userIsLastname,
  userIsUsername,
  userIsEmail,
  userIsLatitude,
  userIsLongitude,
} = require('../../utils')
const { ERRORS } = require('../../config/constants').RESPONSES

const verifyInput = (fields) => {
  let err = false
  const possibleFields = [
    'username',
    'firstname',
    'lastname',
    'email',
    'birthday',
    'biography',
    'allowLocation',
    'latitude',
    'longitude',
    'gender',
    'sexualOrientation',
    'connect',
    'disconnect',
    'interest',
  ]
  Object.keys(fields).forEach((key) => {
    if (key === 'username' && !userIsUsername(fields[key])) err = true
    if (key === 'firstname' && !userIsFirstname(fields[key])) err = true
    if (key === 'lastname' && !userIsLastname(fields[key])) err = true
    if (key === 'email' && !userIsEmail(fields[key])) err = true
    if (key === 'birthday' && !userIsBirthdate(fields[key])) err = true
    if (key === 'biography' && isEmpty(fields[key])) err = true
    if (key === 'allowLocation' && fields[key] !== true && fields[key] !== false) err = true
    if (key === 'latitude' && !userIsLatitude(fields[key])) err = true
    if (key === 'longitude' && !userIsLongitude(fields[key])) err = true
    if (key === 'gender' && isEmpty(fields[key])) err = true
    if (key === 'sexualOrientation' && isEmpty(fields[key])) err = true
    if (key === 'interest' && isEmpty(fields[key])) err = true
    if (!possibleFields.includes(key)) err = true
  })
  return err
}

const fetchPromises = (userId, fields, userInstance) => {
  const promises = []
  Object.keys(fields).forEach((key) => {
    if (key === 'firstname') promises.push(userInstance.setGeneralInformation(userId, key, fields[key].charAt(0).toUpperCase() + fields[key].slice(1)))
    else if (key === 'lastname') promises.push(userInstance.setGeneralInformation(userId, key, fields[key].toUpperCase()))
    else if (key === 'gender') promises.push(userInstance.setGender(userId, fields[key]))
    else if (key === 'sexualOrientation') promises.push(userInstance.setSexualOrientation(userId, fields[key]))
    else if (key === 'connect') promises.push(userInstance.setGeneralInformation(userId, 'is_connected', 1))
    else if (key === 'disconnect') promises.push(userInstance.setDisconnected(userId))
    else if (key === 'interest') promises.push(userInstance.setInterests(userId, fields[key]))
    else promises.push(userInstance.setGeneralInformation(userId, key, fields[key]))
  })
  return promises
}

router.put('/:id', (req, res) => {
  if (!isNumeric(req.params.id)) return res.sendStatus(404)
  if (isEmpty(req.body.fields)) return res.status(400).json({ err: ERRORS.DATA_MISSING })
  if (verifyInput(req.body.fields)) return res.status(400).json({ err: ERRORS.DATA_VALIDATION })
  const userInstance = new User()
  const promises = fetchPromises(req.params.id, req.body.fields, userInstance)
  return Promise.all(promises)
    .then(() => {
      userInstance.closeDatabaseConnection()
      userInstance.setProfileComplete(req.params.id)
    })
    .then(user => res.json({ user }))
    .catch(err => res.json({ err: err.message }))
})

module.exports = router
