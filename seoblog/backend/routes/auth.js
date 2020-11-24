const express = require('express')
const { signup, signin, signout, requireSign } = require('../controllers/auth')
const router = express.Router()

const { runValidation } = require('../validators')
const { userSignupValidator, userSigninValidator } = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.get('/signout', signout)

router.get('/secret', requireSign, (req, res) => {
  res.json({ secret: 'Ready' })
})

module.exports = router
