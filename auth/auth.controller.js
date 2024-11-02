//Los controladores se encargan de la lógica consulta/respuesta. En el controller no importo express, no importo Router, no importo nada, lo único que voy hacer es crear funciones. Las funciones controladoras son las que se encargan de controlar como viene la requisición y como va a responder. Los controladores reciben una consulta (req) y responden (res).
const { registerService, loginService } = require('./auth.service')
const jwt = require('jsonwebtoken')
const { validarExistencia } = require('./helpers/validation.helper')


const loginController = async (req, res) => {//trabajamos la firma de token.
    const { email, password } = req.body
    try {
        const token = await loginService({ email, password })// capturamos el token generado en el service.
        res.status(200).json({ ok: true, message: 'USUARIO LOGUEADO.', token: token })
    } catch (error) {
        res.status(error.status).json(error)
    }
}

const registerController = async (req, res) => {
    const { email, password } = req.body//recibimos el email y el password del body.
    try {
        //el servicio de registro, registerService, recibe u usuario.
        const resultado = await registerService({ email: email, password: password })//traigo el registerService del auth.service.js.
        res.status(200).json(resultado)
    } catch (error) {
        res.status(error.status).json(error)
    }
}

const verifyTokenController = (req, res) => {//verifica el token de login, por ejemplo, verificamos que el usuario tiene sesion activa.La ruta con la que vamos a consultar para ver si un token es válido o no.
    const token = req.headers['authorization']//recibimos el token por la cabecera de la request.
    //console.log(req.headers)
    if (!validarExistencia(token) || !isNaN(token) || token == 'null' || token == 'undefined') {//si el token no pasa la validarExistencia o si el token no es un NaN o que el token sea igual a null o si el token es igual a undefined.
        res.status(400).json({ status: 400, message: 'DEBES PROPORCIONAR UN TOKEN VÁLIDO.' })
    }
    const tokenValido = jwt.verify(token, process.env.JWT_SECRET_KEY)//verificamos el token.
    if (!tokenValido) {
        res.status(401).json({ status: 401, message: 'TOKEN INVÁLIDO.' })
    }
    else {
        res.status(200).json({ status: 200, message: 'TOKEN CORRECTO. USUARIO LOGUEADO.' })
    }
}
module.exports = { loginController, registerController, verifyTokenController } //exporto el controladores.