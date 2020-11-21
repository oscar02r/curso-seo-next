const express = require('express')
const router = express.Router()
const {  requireSign, adminMiddleware } = require('../controllers/auth')
const { create, list, read, remove} = require('../controllers/category')


const { runValidation } = require('../validators')
const {categoryCreateValidator } = require('../validators/category')

router.post('/category', categoryCreateValidator, runValidation, requireSign, adminMiddleware, create )
router.get('/categories', list)
router.get('/category/:slug', read)
router.delete('/category/:slug',requireSign, adminMiddleware, remove)


module.exports= router  