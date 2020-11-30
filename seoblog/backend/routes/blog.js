const express = require('express')
const { create, list, litsAllBlogsCategoiesTags, read, remove, update, photo, listRelated, listSearch} = require('../controllers/blog')
const { requireSign, adminMiddleware, authMiddleware } = require('../controllers/auth')
const router = express.Router()

router.post('/blog', requireSign, adminMiddleware, create)
router.get('/blogs', list)
router.post('/blog-categories-tags', litsAllBlogsCategoiesTags)
router.get('/blog/:slug', read)
router.delete('/blog/:slug', requireSign, adminMiddleware, remove)
router.put('/blog/:slug', requireSign, adminMiddleware, update)
router.get('/blog/photo/:slug', photo)
router.post('/blogs/related', listRelated)
router.get('/blogs/search', listSearch)

//Auth user blog crud
router.post('/user/blog', requireSign, authMiddleware, create)
router.delete('/user/blog/:slug', requireSign, authMiddleware, remove)
router.put('/user/blog/:slug', requireSign, authMiddleware, update)

module.exports = router
