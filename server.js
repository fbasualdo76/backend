const express = require('express')//importo express.
const dotenv = require('dotenv')//importo dotenv.
const cors = require('cors')//importo cors.
dotenv.config()//activo el dotenv.
const { database } = require('./config/connection.sql')//lamo a la conexion de la base da datos
const { authRouter } = require('./auth/auth.router')
const { productsRouter } = require('./products/products.router')
const { cartsRouter } = require('./carts/carts.router')

const PORT = process.env.PORT || 4000// llamo al puerto que tengo en el .env "o" el 4000.
const app = express()
app.use(cors())//El backend al que estamos consultando no está hecho para recibir consultas. Permitimos consulta de origen cruzado.
app.use(express.json())//permite que mi aplicación reciba json.

app.get('/test', (req, res) => {
    res.json({ status: 200, message: 'HOLIS' })
})

app.use('/api/auth', authRouter)//indico la ruta que va utilizar el authRouter. Que mi aplicación utilice la ruta `api/auth` con los endpoints que estan en el auth.router.js
app.use('/api/products', productsRouter)//indico la ruta que va utilizar el productsRouter. Que mi aplicación utilice la ruta `api/products` con los endpoints que estan en el products.router.js
app.use('/api/carts', cartsRouter)//indico la ruta que va utilizar el cartsRouter. Que mi aplicación utilice la ruta `api/carts` con los endpoints que estan en el carts.router.js

app.listen(PORT, () => console.log(`Nuestra aplicación se ejecuta en el puerto http://localhost:${PORT}`))