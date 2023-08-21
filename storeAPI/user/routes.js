const express = require('express')
const middleware = require('./middleware')
const controller = require('./controller')

const userRouter = express.Router()

userRouter.post('/signup', middleware.validUserCreation, controller.signUp)
userRouter.post('/login', controller.login)

userRouter.use(middleware.authenticate)
userRouter.get('/me', controller.getMyInfo)
userRouter.get('/', middleware.isRoleAdmin, controller.getAllUser)
userRouter.post('/logout', controller.logout)


module.exports = userRouter
