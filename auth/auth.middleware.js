const { validarExistencia } = require("./helpers/validation.helper")
const jwt = require('jsonwebtoken')

const verifyTokenMiddleware = (req, res, next) => {//verifica el token de login, por ejemplo, verificamos que el usuario tiene sesion activa.La ruta con la que vamos a consultar para ver si un token es válido o no.
    const token = req.headers['authorization']//recibimos el token por la cabecera de la request.
    //console.log(req.headers)
    if (!validarExistencia(token) || !isNaN(token) || token == 'null' || token == 'undefined') {//si el token no pasa la validarExistencia o si el token no es un NaN o que el token sea igual a null o si el token es igual a undefined.
        return res.status(400).json({ status: 400, message: 'DEBES PROPORCIONAR UN TOKEN VÁLIDO.' })
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, datos) => {//verificamos el token. Trabajamos con la callback de resultado. Verificamos el token, y si está todo bien obtenemos los datos (del token) y si esá todo mal va hacer error.
        //console.log(datos)
        if (error) {//si hay un error largo TOKEN INVÁLIDO
            return res.status(401).json({ status: 401, message: 'TOKEN INVÁLIDO.' })
        }
        else {// si no, voy a guardar en la consulta, en una propiedad llamada user los mismos datos (del token). Guardamos en el objeto de request los datos ya transformados del token. Ese objeto que habiamos transformado una vez ahora lo estamos destransformando.
            req.user = datos//Guardo en la consulta los datos del token. La propiedad .user suele usarse para guardar estos datos.
            next()
        }
    })
}
module.exports = { verifyTokenMiddleware }