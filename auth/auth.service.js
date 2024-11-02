//acá manejamos lógica de negocio.
const { buscarUsuarioPorEmail, insertarUsuario } = require('./auth.repository')
const bcrypt = require('bcrypt')//importamos bcrypt.
const { validarUsuario } = require('./utils/validation.User.Util')
const jwt = require('jsonwebtoken')

const registerService = async (usuario) => {//recibimos el usuario.
    try {
        const { email, password } = usuario//email y password del usuario.
        //valido y voy largando los errores.
        validarUsuario({ email, password })
        const resultadoBuscarUsuarioPorEmail = await buscarUsuarioPorEmail(usuario.email)
        if (resultadoBuscarUsuarioPorEmail) {
            throw { status: 400, message: 'EMAIL EXISTENTE.' }
        }
        const passwordHash = await bcrypt.hash(usuario.password, 10)//haseamos el password.
        const resultadoInsertarUsuario = await insertarUsuario({ email: usuario.email, password: passwordHash })
        if (resultadoInsertarUsuario) {
            return { ok: true, message: 'USUARIO REGISTRADO CORRECTAMENTE.' }
        }
    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}

const loginService = async (usuario) => {
    try {
        const { email, password } = usuario
        validarUsuario(usuario)
        const resultadoBuscarUsuarioPorEmail = await buscarUsuarioPorEmail(usuario.email)
        if (!resultadoBuscarUsuarioPorEmail) {
            throw { status: 400, message: 'EMAIL NO EXISTENTE.' }
        }
        const comparacionPassword = await bcrypt.compare(password, resultadoBuscarUsuarioPorEmail.password)
        if (!comparacionPassword) {
            throw { status: 400, message: 'PASSWORD INCORRECTO.' }
        } else {
            const token = jwt.sign({ email, usuario_id: resultadoBuscarUsuarioPorEmail.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })//tokeo.
            return token //el servicio de logueo retorna el token que vamos a capturar en el controller.
        }

    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}
module.exports = { registerService, loginService }//exporto el servicio.