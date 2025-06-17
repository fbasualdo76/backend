//PAYMENTS.ROUTER.JS
const express = require('express')
const { generarPreferencia, procesarPago, consultarPago } = require("./payments.controller");

const paymentsRouter = express.Router()

/*
/api/payments
*/

// Ruta para generar la preferencia de pago
paymentsRouter.post("/", generarPreferencia);

paymentsRouter.post("/procesar-pago", procesarPago);

paymentsRouter.post("/consultar-pago", consultarPago);

module.exports = { paymentsRouter/*: router */ };