//1. la variable database es la variable que genera la query, es a esta variable, a la que tenemos que modificar para que la query devuelva una promesa.

const mysql = require('mysql')//importo librería mysql.

const util = require('util')//2. traemos util: es una api interna que tene nodejs para tener utilidades, de éstas, vamos utilizar la utilidad de PROMISIFY: capacidad de nodejs de transformar en promesa algo que no trabaja con promesa.

// traigo las variables del .env.
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USERNAME = process.env.DB_USERNAME || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const userSettings = {//creo objeto de conexión con las variables de .env.
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
}
const database = mysql.createConnection(userSettings)//creo conexión pasandole el objeto de conexion.
//Activamos el método connect. Cuando nosotros queremos una conexión va ocurrir en algún punto que nos conectemos a la base de datos, cuando se conecte a la base de datos se va activar el método connect. El método connect nos esta diciendo que cuando se termine de crear la conexión se activa la función o callback.

const query = util.promisify(database.query).bind(database)
//3. creo la función query (debajo de database) a la cual le tengo que pasar los datos para hacer la promesa.

database.connect((error) => {
    if (error) {
        console.error('Error de conexión:', error)
    }
    else {
        console.log('Te has conectado exitosamente a la base de datos:', DB_NAME)
    }
})
module.exports = { database, query }//4. exportamos query y la importamos en el auth.repository.