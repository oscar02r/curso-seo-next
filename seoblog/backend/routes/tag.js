const express = require('express')
const router = express.Router()
const { requireSign, adminMiddleware } = require('../controllers/auth')
const { create, list, read, remove } = require('../controllers/tag')

const { runValidation } = require('../validators')
const { tagCreateValidator } = require('../validators/tag')

router.post('/tag', tagCreateValidator, runValidation, requireSign, adminMiddleware, create)
router.get('/tags', list)
router.get('/tag/:slug', read)
router.delete('/tag/:slug', requireSign, adminMiddleware, remove)

module.exports = router
