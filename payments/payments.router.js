//PAYMENTS.ROUTER.JS
const express = require('express')
const { generarPreferencia, procesarPago } = require("./payments.controller");
const paymentsRouter = express.Router()

// Ruta para generar la preferencia de pago
paymentsRouter.post("/", generarPreferencia);
paymentsRouter.post("/procesar-pago", procesarPago);

module.exports = { paymentsRouter/*: router */ };