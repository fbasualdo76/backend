const { validarExistencia, validarEmail } = require("../helpers/validation.helper")

const validarUsuario = (usuario) => {
    if (!validarExistencia(usuario.email)) {
        throw { status: 400, message: 'EMAIL ES OBLIGATORIO.' }
    }

    if (!validarExistencia(usuario.password)) {
        throw { status: 400, message: 'PASSWORD ES OBLIGATORIO.' }
    }

    if (!validarEmail(usuario.email)) {
        throw { status: 400, message: 'EMAIL NO VÁLIDO.' }
    }
}
module.exports = { validarUsuario }