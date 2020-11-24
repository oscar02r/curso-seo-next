const express = require('express')
const { requireSign, authMiddleware, adminMiddleware } = require('../controllers/auth')
const { read } = require('../controllers/user')

const router = express.Router()

router.get('/profile', requireSign, authMiddleware, authMiddleware, read)

module.exports = router
