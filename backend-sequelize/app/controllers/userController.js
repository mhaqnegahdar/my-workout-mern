const User = require('../models/userModel')
const validator = require('validator')


// Login
const loginUser=async(req,res)=>{

    const {email,password} = req.body


    try {
        const user = await User.authenticateByEmailAndPassword(email,password)

        if(!user){
            res.status(403).json({error:'Access Denied'})
        }

        res.status(200).json(user)
        
    } catch (error) {
        res.status(400).json({error:error.message})

    }
}

// Singup
const signupUser=async(req,res)=>{

    const {email,password} = req.body

    // if (!validator.isStrongPassword(password)) {
    //     res.status(400).json({error:'Weak Password'})
    // }
    try {
        const user = await User.create({email,password})
        
        res.status(200).json({email,user})
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

module.exports={loginUser,signupUser}
