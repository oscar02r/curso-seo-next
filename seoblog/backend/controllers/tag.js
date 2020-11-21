const Tag = require('../models/tag')
const  slygify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res)=>{ 
       const { name } = req.body
       const slug = slygify(name).toLowerCase()
       let tag = new Tag({name, slug})

       tag.save((err,data)=>{
            if (err) {
                return res.status(400).json({error:errorHandler(err)})
            }
            res.status(201).json(data)
       })
}

exports.list = (req, res) =>{
    Tag.find({}).exec((err, data) =>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.status(200).json(data)
    })
}

exports.read = (req, res)=>{
    const slug = req.params.slug.toLowerCase()
    Tag.findOne({slug}).exec((err, tag)=>{
        if (err) {
            return res.status(400).json({error:errorHandler(err)})
        }
        res.status(200).json(tag)
    })
}

exports.remove = (req, res)=>{
    const slug = req.params.slug.toLowerCase()
    Tag.findOneAndRemove({slug}).exec((err, data)=>{
        if (err) {
            return res.status(400).json({error:errorHandler(err)})
        }
        res.status(200).json({message: 'Tag deleted successfully.'})
    })
}