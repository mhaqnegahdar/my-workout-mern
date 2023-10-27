// Packages
const router = require('express').Router()

// Controllers
const {loginUser,signupUser}=require('../app/controllers/userController')


router.post('/login',loginUser)
router.post('/signup',signupUser)

module.exports =router