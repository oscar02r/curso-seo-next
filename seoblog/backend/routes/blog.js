const express = require('express')
const { create, list, litsAllBlogsCategoiesTags, read, remove, update, photo, listRelated} = require('../controllers/blog')
const { requireSign, adminMiddleware } = require('../controllers/auth')
const router = express.Router()

router.post('/blog', requireSign, adminMiddleware, create)
router.get('/blogs', list)
router.post('/blog-categories-tags', litsAllBlogsCategoiesTags)
router.get('/blog/:slug', read)
router.delete('/blog/:slug', requireSign, adminMiddleware, remove)
router.put('/blog/:slug', requireSign, adminMiddleware, update)
router.get('/blog/photo/:slug', photo)
router.post('/blogs/related', listRelated)
module.exports = router
