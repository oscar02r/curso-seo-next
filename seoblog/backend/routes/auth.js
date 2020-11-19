const express = require('express')
const { signup } = require('../controllers/auth')
const router = express.Router()

const { runValidation } = require('../validators')
const {userSignupValidator } = require('../validators/auth')
router.post ('/signup',userSignupValidator, runValidation,  signup)

module.exports= router 