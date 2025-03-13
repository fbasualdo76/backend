//PAYMENTS.ROUTER.JS
const express = require('express')
const { generarPreferencia } = require("./payments.controller");
const paymentsRouter = express.Router()

// Ruta para generar la preferencia de pago
paymentsRouter.post("/", generarPreferencia);

module.exports = { paymentsRouter/*: router */ };