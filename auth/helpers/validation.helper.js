//validaciones.
const validarEmail = (email) => {
    //https://w3resource.com/javascript/form/email-validation.php
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}
const validarExistencia = (valor) => {
    return Boolean(valor)
}


module.exports = { validarEmail, validarExistencia }