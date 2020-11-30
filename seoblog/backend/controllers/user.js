const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs')
const User = require('../models/user')
const Blog = require('../models/blog')
const errorHandler = require('../helpers/dbErrorHandler');

exports.read = (req, res) => {
  req.profile.hashed_password = undefined
  return res.json(req.profile)
}

exports.publicProfile = async (req, res) =>{
    let {username} = req.params
    let user
    let blogs
    try {
      
      let userFromDB = await User.findOne({username}) 
      
      if (!userFromDB) {
        res.status(400).json({error:'User not found'})
      }
       userFromDB.hashed_password= undefined
       user = userFromDB
      let userId = userFromDB._id
      blogs = await Blog.find({postedBy:userId})
            .populate('categories', '_id name slug')
            .populate('tags', '_id name slug')
            .populate('postedBy', '_id name')
            .limit(10)
            .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
            if (!blogs) {
              res.status(400).json({error:'Blogs not found.'})
            }
           res.status(200).json({user, blogs})
    } catch (err) {
      res.status(400).json({error:errorHandler (err)})
    }
}

exports.update = (req, res) =>{
     let form = new formidable.IncomingForm()
     form.keepExtensions =true
     form.parse(req, (err, fields, files)=>{
                if (err) {
                  return res.status(400).json({
                      error:'Photo could not be uploaded.'
                  })
                }
                let user = req.profile
                user = _.extend(user, fields)
                if (files.photo) {
                  if (files.photo.size > 100000) {
                    return res.status(400).json({error:'Image should be less than 1mb.'})
                  }
                  user.photo.data = fs.readFileSync(files.photo.path)
                  user.photo.contentType = files.photo.type
                }

                user.save((err, result)=>{
                  if (err) {
                    return res.status(400).json({
                      error: errorHandler(err)
                  })
                  }
                  user.hashed_password = undefined
                  res.status(200).json(user)
                })
     })
         
}
 
exports.photo = (req, res) =>{
  const username = req.params.username
  User.findOne({username}).exec((err, user)=>{
    if (err || !user) {
      res.status(400).json({error:'User not found.'})
    }
    if (user.photo.data) {
      res.set('Content-Type', user.photo.contentType)
      return res.send(user.photo.data)
    }
  })
}






