const express = require('express')
const { requireSign, authMiddleware, adminMiddleware } = require('../controllers/auth')
const { read,  publicProfile , update, photo} = require('../controllers/user')

const router = express.Router()

router.get('/user/profile', requireSign, authMiddleware, read)
router.get('/user/:username', publicProfile)
router.put('/user/update', requireSign, authMiddleware,  update)
router.get('/user/photo/:username', photo)
module.exports = router
