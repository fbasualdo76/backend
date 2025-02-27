//PAYMENTS.ROUTER.JS
const express = require('express')
//const router = express.Router();
const { generarPreferencia } = require("./payments.controller");
const paymentsRouter = express.Router()

// Ruta para generar la preferencia de pago
//router.post("/create-preference", generarPreferencia);
paymentsRouter.post("/create-preference", generarPreferencia);

module.exports = { paymentsRouter/*: router */ };
