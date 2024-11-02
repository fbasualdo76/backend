**06.06.2024**
Que deberiamos validar antes de crear un producto
titulo: + de 3 caracteres y tiene que ser string
precio: mas de 1 y numerico
descripcion: + 20 caracteres y debe ser string
stock:  almenos 1 o mas
codigo: que sea string y mas de 1 caracter

Vamos a recibir estos datos y se los pasaremos al servicio, el servicio se encargara de validar
que el objeto recibido tenga correctamente las propiedades (NO DEBE FALTAR PROPIEDADES NI DEBE HABER PROPIEDADES DEMAS)

crearProduct({title, precio, descripcion, stock, codigo})

crearProduct({title, precio, descripcion, stock, codigo, fecha: 'pepe', queDesayune: true}) 
La funcion debera hacer un throw de error con el sig formato:
{status: 400, message: '[fecha, queDesayune] no son datos habilitados para crear un producto'}

crearProduct({title, precio, descripcion, stock, codigo, fecha: 'pepe', nombre: 'juan'}) 
La funcion debera hacer un throw de error con el sig formato:
{status: 400, message: '[fecha, nombre] no son datos habilitados para crear un producto'}

crearProduct({title, precio, descripcion, codigo, fecha: 'pepe', nombre: 'juan'}) 
La funcion debera hacer un throw de error con el sig formato:
{status: 400, message: '[stock] es necesario para crear un producto'}

crearProduct({title, precio, codigo, fecha: 'pepe', nombre: 'juan'}) 
La funcion debera hacer un throw de error con el sig formato:
{status: 400, message: '[stock, descripcion] es necesario para crear un producto'}

SI todo esta bien, entonces retornara un objeto 
{status: 201, message: 'Producto creado con exito', producto: productoCreado}

TODO DEBE SER TESTEADO POR POSTMAN

RECOMENDACION: For in, For of
propiedades : ['title', 'precio']
for(let property in productToCreate){
    propiedades.includes(property)
}
for(let propery of propiedades){
    productToCreate[property]
}

Object.keys(objeto) Les va a dar un array de propiedades

**11.06.2024**
Desarrollar el endpoint

DELETE /api/products/:pid

DELETE /api/products/90
Response example: {message: Producto con id 90 no existe, status: 404}

DELETE /api/products/1
Response example: {message: 'Producto con id 1 eliminado correctamente', status: 200}

UPDATE /api/products/:pid 
body:{
    titulo: 'nuevo valor de titulo',
    precio: 'nuevo valor de precio
} EJEMPLO

UPDATE /api/products/90
Response example: {message: Producto con id 90 no existe, status: 404}

UPDATE /api/products/1
Response example: {message: 'producto con id 1 actualizado correctamente', producto_actualizado: producto, status: 200}

DEBEN VALIDAR QUE LAS NUEVAS PROPIEDADES PASEN LAS VALIDACIONES