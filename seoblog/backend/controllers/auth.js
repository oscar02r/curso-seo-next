exports.signup = (req, res) =>{
   const { name, email, password } = req.body
    res.status(201).json({
       user:{name, email, password}
   });
}