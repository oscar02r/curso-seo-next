const express = require('express')
const { signup, signin, signout, requireSign, resetPassword, forgotPassword } = require('../controllers/auth')
const router = express.Router()

const { runValidation } = require('../validators')
const { userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.get('/signout', signout)
router.put('/forgot-password',  forgotPassword )
router.put('/reset-password', resetPassword)
router.get('/secret', (req, res) => {
  res.json({ secret: 'Ready' })
})

module.exports = router
