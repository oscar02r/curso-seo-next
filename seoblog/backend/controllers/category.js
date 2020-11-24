const Category = require('../models/category')
const slygify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
  const { name } = req.body
  const slug = slygify(name).toLowerCase()
  const category = new Category({ name, slug })

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) })
    }
    res.status(201).json(data)
  })
}

exports.list = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.status(200).json(data)
  })
}

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase()
  Category.findOne({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) })
    }
    res.status(200).json(category)
  })
}

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase()
  Category.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) })
    }
    res.status(200).json({ message: 'Category deleted successfully.' })
  })
}
