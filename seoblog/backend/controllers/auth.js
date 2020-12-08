const shortId = require('shortid')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const Blog = require('../models/blog')
const _ = require('lodash')
const nodemailer = require('nodemailer')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.findOne({ email: email })

    if (user) {
      return res.status(500).json({ error: 'Email is taken.' })
    }

    const username = shortId.generate()
    const profile = `${process.env.CLIENT_URL}/profile/${username}`
    const newUser = new User({ name, email, password, profile, username })
    await newUser.save(/* (err, success)=>{
             if (err) {

                return res.status(400).json({error:err})

             }
            // res.status(201).json({user:success})
              res.status(201).json({
                 message:'Signup success! Please signin.'
              })
         } */)
    res.status(201).json({
      message: 'Signup success! Please signin.'
    })
  } catch (error) {
    return res.status(400).json({ error: error.stack })
  }

  /* .exec((error, user) =>{

            if (user) {

               return res.status(400).json({error:"Email is taken."})
            }
       }) */
}

exports.signin = (req, res) => {
  const { email, password } = req.body
  // Check if user exist.
  User.findOne({ email })
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User with that email or password do not exit. Plasea signup.'
        })
      }

      // athenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: 'Email or password do not match.'
        })
      }

      // Genarate token to send client

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

      res.cookie('token', token, { expiresIn: '1d' })
      const { _id, username, name, email, role } = user
      return res.status(200).json({
        token,
        user: {
          _id,
          username,
          name,
          email,
          role
        }
      })
    })
}

exports.signout = (req, res) => {
  res.clearCookie('token')

  return res.status(200).json({ message: 'Signout success' })
}

exports.requireSign = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
})

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err, !user) {
      return res.status(400).json({ error: 'User not found' })
    }
    req.profile = user
    next()
  })
}

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err, !user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (user.role !== 1) {
      return res.status(400).json({ error: 'Admin recource. Access denied' })
    }
    req.profile = user
    next()
  })
}

exports.canUpdateDeleteBlog = async (req, res, next) =>{
    const slug = req.params.slug.toLowerCase()
    
     try {
        let blog = await  Blog.findOne({slug})    
        let authorizedUser = blog.postedBy._id.toString() === req.profile._id.toString()
        if (!authorizedUser) {
          return res.status(400).json({error:'Unauthorize user.'})
        }
        next()
     } catch (err) {
       res.status(400).json({error:errorHandler(err)})
     }
}

exports.forgotPassword = async (req, res) =>{
  const { email} = req.body

  try {

    const user = await User.findOne({email})
    if (!user) {
      return res.status(401).json({error:'User with that emial does not exist.'})
    }
    const token = jwt.sign({ _id:user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn:'10m' })
    const transport = nodemailer.createTransport({
      host:process.env.HOST_EMAIL,
      port: 587,
      auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_EMAIL_PASSWORD
      }
  });

    let html = `

       <p>Please use the following link to reset your password</p>
       <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
       <hr />
       <p>This email contain sensitve information</p>
       <p>https://devcoding.com</p>
    `
    const mailOptions ={
       from:"DevCodign",
       to:email,
       subject:"Send from DevCoding.",
       html:html
    }

    await user.updateOne({resetPasswordLink:token})

    transport.sendMail(mailOptions, (err, info)=>{
          if (err) {
            return res.status(500).json({error:err.message})
          } else{
            res.status(200).json({
              message:`Email has been send to ${email}. Follow the instructions to reset your password. Link expires in  10min.`
            })
          }
    })
  } catch (error) {
      res.status(401).json({error:errorHandler(error)})
  }
}

exports.resetPassword = async (req, res) =>{
  const {resetPasswordLink, newPassword} = req.body 

  try {
      if (resetPasswordLink) {
      const data = await jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD)
     
      res.status(200).json(data)
      }
      
      const user = await User.findOne({resetPasswordLink})
     if (!user) {
         res.status(401).json({error:'Something went wrong. Try later.'})
     }
     const updatedFiels = {
         password: newPassword,
         resetPasswordLink:''
     }
     user = _.extend(user, updatedFiels)
     await user.save()
     res.status(200).json({
       message:'Great! Now you can login with your new password.'
     })
    } catch (error) {
      res.status(401).json({error:errorHandler(error )})
    }
}