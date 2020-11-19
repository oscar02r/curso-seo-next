const shortId = require('shortid')
const User = require('../models/user')

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