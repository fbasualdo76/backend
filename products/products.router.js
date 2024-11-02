const express = require('express')
const { postProductController, getProductByIdController, deleteProductByIdController, getAllProductsController, putProductByIdController, getAllProductsPaginationController } = require('./products.controller')
const { verifyTokenMiddleware } = require('../auth/auth.middleware')

const productsRouter = express.Router()
/*
/api/products

get all: /
post crear producto: /
put actualizar producto: /
delete eliminar producto: /
get by id: /:pid
*/
//TODO: AGREGAR MIDDLEWARE DE VERIFICACIÓN DE TOKEN.

productsRouter.get('/', getAllProductsController)

productsRouter.get('/', getAllProductsPaginationController)//pagination.

productsRouter.post('/', postProductController)

productsRouter.put('/:pid', putProductByIdController)

productsRouter.delete('/:pid', deleteProductByIdController)

productsRouter.get('/:pid', getProductByIdController)

module.exports = { productsRouter }