const express = require('express')
const { postUserLoginController, postUserRegisterController, postUserAuthController } = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/login', postUserLoginController)
userRouter.post('/register', postUserRegisterController)
userRouter.post('/auth', postUserAuthController)

module.exports = userRouter