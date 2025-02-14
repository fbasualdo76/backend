const express = require('express')
const { postOrdersController } = require('./orders.controller')
const { verifyTokenMiddleware } = require('../auth/auth.middleware')

const ordersRouter = express.Router()
/*
/api/carts

post: /
get: /
*/
//TODO: AGREGAR MIDDLEWARE DE VERIFICACIÓN DE TOKEN.

ordersRouter.get('/', /*verifyTokenMiddleware,getOrdersController */)
//El middleware verifica que se envíe el token, sino va a responder con error, si todo esta bien, va a ejecutar el controlador.
ordersRouter.post('/', /*verifyTokenMiddleware, */postOrdersController)
//Pasando el verifyTokenMiddleware vamos a poder obtener {user_id: x, rol: 'admin'}
ordersRouter.delete('/:product_id', /*verifyTokenMiddleware,deleteProductFromOrdersController */)
module.exports = { ordersRouter }