//CARTS.ROUTER.JS
const express = require('express')
const { getCartsController, postCartsController, deleteProductFromCartController } = require('./carts.controller')
const { verifyTokenMiddleware } = require('../auth/auth.middleware')

const cartsRouter = express.Router()

/*
/api/carts

post: /
get: /
*/

cartsRouter.get('/', /*verifyTokenMiddleware, */getCartsController)
//El middleware verifica que se envíe el token, sino va a responder con error, si todo esta bien, va a ejecutar el controlador.

cartsRouter.post('/', /*verifyTokenMiddleware, */postCartsController)
//Pasando el verifyTokenMiddleware vamos a poder obtener {user_id: x, rol: 'admin'}

cartsRouter.delete('/:product_id', /*verifyTokenMiddleware, */deleteProductFromCartController)
module.exports = { cartsRouter }