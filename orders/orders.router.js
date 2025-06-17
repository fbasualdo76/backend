//ORDERS.ROUTER.JS
const express = require('express')
const { postOrdersController, putOrdersController } = require('./orders.controller')
const { verifyTokenMiddleware } = require('../auth/auth.middleware')

const ordersRouter = express.Router()

/*
/api/orders

post: /
get: /
*/

ordersRouter.get('/', /*verifyTokenMiddleware,getOrdersController */)
//El middleware verifica que se envíe el token, sino va a responder con error, si todo esta bien, va a ejecutar el controlador.

ordersRouter.post('/', /*verifyTokenMiddleware, */postOrdersController)
//Pasando el verifyTokenMiddleware vamos a poder obtener {user_id: x, rol: 'admin'}

ordersRouter.put('/:id/payment', putOrdersController)////Actualiza el payment_method (forma de pago) y payment_status (estado de pago) de la orden.

ordersRouter.delete('/:product_id', /*verifyTokenMiddleware,deleteProductFromOrdersController */)
module.exports = { ordersRouter }