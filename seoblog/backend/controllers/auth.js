const shortId = require('shortid')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) =>{
   const { name, email, password } = req.body

   User.findOne({email:email})
       .exec((error, user) =>{
            if (user) {
               return res.status(400).json({error:"Email is taken"})
            }
       })

     let username = shortId.generate()
     let profile =`${process.env.CLIENT_URL}/profile/${username}` 
    
     let newUser = new User({name, email, password, profile, username})
   
     newUser.save((err, success)=>{
         if (err) {
            return res.status(400).json({error:err})
         }
         res.status(201).json({user:success})
         // res.status(201).json({
            // message:'Signup success! Please signin.'
         // })
     })
}

exports.signin = (req, res) =>{
            const { email, password} = req.body
            // Check if user exist.
            User.findOne({email})
                .exec((err, user)=>{
               if (err || !user) {
                   return res.status(400).json({
                      error:"User with that email or password do not exit. Plasea signup."
                   })
               } 

               //athenticate
               if (!user.authenticate(password)) {
                  return res.status(400).json({
                     error:"Email or password do not match."
                  })
               }

               //Genarate token to send client

               const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'} )

               res.cookie('token', token, {expiresIn:'1d'})
               const { _id, username, name, email, role } = user
               return res.status(200).json({
                  token,
                  user:{
                     _id,
                     username,
                     name,
                     email,
                     role
                  }
               })
            }) 
}

exports.signout = (req, res)=>{
   res.clearCookie('token')
   res.status(200).json({ message:'Signout success' })
}

exports.requireSign = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})