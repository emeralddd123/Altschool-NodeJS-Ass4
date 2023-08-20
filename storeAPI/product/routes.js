const express = require('express')
const controller = require('./controller')
const middleware = require('./middleware')

const productRouter = express.Router()

productRouter.get('/', controller.getAllProduct)
productRouter.get('/:id([0-9]+)', controller.getProduct)

// productRouter.use(AuthMid, adminMid,)
productRouter.post('/', middleware.validateProduct, controller.createProduct)
productRouter.put('/:id([0-9]+)', middleware.validateProduct, controller.editProduct)
productRouter.delete('/:id([0-9]+)', controller.deleteProduct)


module.exports = productRouter
