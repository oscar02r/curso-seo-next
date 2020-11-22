const express = require('express')
const { create } = require('../controllers/blog')
const {  requireSign, adminMiddleware } = require('../controllers/auth')
const router = express.Router()

router.post('/blog', requireSign,adminMiddleware,create)
module.exports = router
