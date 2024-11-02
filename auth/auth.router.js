//Las rutas se encargan de definir que endpoints o que rutas se estan manejando.
const express = require('express')
const { loginController, registerController, verifyTokenController } = require("./auth.controller")

const authRouter = express.Router()//creo la ruta autentificación.

//creo las rutas que pertenecen al dominio de autentificación. Cada endpoint tiene una callback, p.ej.: authRouter.post(`/login`, (req, res) => {}, la cual va a ser remplazada por el controlador.
authRouter.post('/register', registerController)// /api/auth/register. El registerController viene de auth.controller. El registerController es una función que se va encargar de la consulta y la respuesta, como todas las funciones controladoras

authRouter.post('/login', loginController) // /api/auth/login. El loginController viene de auth.controller.

authRouter.get('/verify-token', verifyTokenController)// /api/auth/verify-token.

module.exports = { authRouter }