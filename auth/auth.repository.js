//Lógica con la DB. Acá se obtienen los datos. En el repository siempre vamos a colocar las funciones de manipulación de datos.
const { database, query } = require('../config/connection.sql')//importamos el database. Importamos query.
const bcrypt = require('bcrypt')//importamos bcrypt.
const buscarUsuarioPorEmail = async (email) => {
    try {
        const select = 'SELECT * FROM usuarios WHERE email = ?'
        const resultadoSelect = await query(select, [email])
        if (resultadoSelect.length > 0) {
            return resultadoSelect[0]
        }
        else {
            return null
        }
    } catch (error) {
        //console.error('ERROR SQL al seleccionar usuario por email', error)
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
    }
}
const insertarUsuario = async (usuario) => {
    try {
        const insert = 'INSERT INTO usuarios SET ?'
        const resultadoInsert = await query(insert, usuario)
        return true
    } catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
    }
}

/*buscarUsuarioPorEmail('a@a.com')
.then (resultadoSelect => {
    console.log('RESULTADO SELECT: ', resultadoSelect)
})*/

module.exports = { buscarUsuarioPorEmail, insertarUsuario }