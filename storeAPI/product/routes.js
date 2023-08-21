const express = require('express')

const controller = require('./controller')
const middleware = require('./middleware')
const authMid = require('../user/middleware')

const productRouter = express.Router()
productRouter.use(authMid.authenticate)

productRouter.get('/', controller.getAllProduct)
productRouter.get('/:id([0-9]+)',  controller.getProduct)

productRouter.use(authMid.isRoleAdmin)

productRouter.post('/', middleware.validateProduct, controller.createProduct)
productRouter.put('/:id([0-9]+)', middleware.validateProduct, controller.editProduct)
productRouter.delete('/:id([0-9]+)', controller.deleteProduct)


module.exports = productRouter
