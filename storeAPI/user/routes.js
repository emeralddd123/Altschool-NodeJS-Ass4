const express = require('express')

const userRouter = express.Router()

userRouter.get('/', userAuthMid, getAllUser)
userRouter.post('/signup',signUpCont)
userRouter.post('/login',loginCont)


module.exports = userRouter
