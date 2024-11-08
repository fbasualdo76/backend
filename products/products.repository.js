const { query } = require("../config/connection.sql")

const insertarProducto = async ({ titulo, imagen, descripcion, stock, precio, codigo }) => {

    try {
        const insertar = 'INSERT INTO productos (titulo,imagen,descripcion,stock,precio,codigo) VALUES (?,?,?,?,?,?)'
        const valores = [titulo, imagen, descripcion, stock, precio, codigo]
        const resultadoInsertar = await query(insertar, valores)
        return resultadoInsertar.insertId//retorno el id del producto insertado.
    } catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
    }
}

/*DEJÉ ESTA FUNCIÓN POR LAS DUDAS
const seleccionarProductoPorId = async (pid) => {
    try {
        //const seleccionar = 'SELECT * FROM products WHERE id = ?'
        const resultadoSeleccionar = await query(seleccionar, [pid])
        //console.log(resultadoSeleccionar)
        if (resultadoSeleccionar.length === 0) {
            throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' }
        }
        else {
            return resultadoSeleccionar[0]
        }
    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
        }
    }
}
*/

const seleccionarProductoPorId = async (pid) => {
    try {
        const seleccionar = 'SELECT p.id as id, p.title as title, i.id as imgId, i.imgSource as imgSource FROM products p JOIN images i ON p.id = i.productid WHERE p.id = ?'
        const resultadoSeleccionar = await query(seleccionar, [pid])
        if (resultadoSeleccionar.length === 0) {
            throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' }
        }
        else {
            const product = {
                id: resultadoSeleccionar[0].id,
                title: resultadoSeleccionar[0].title,
                images: resultadoSeleccionar.map(img => ({
                    id: img.imgId,
                    imgSource: img.imgSource
                }))
            };
            return product;
        }
    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
        }
    }
}

const eliminarProductoPorId = async (pid) => {
    try {
        //console.log(pid)
        const eliminar = 'DELETE FROM productos WHERE id = ?'
        const resultadoEliminar = await query(eliminar, [pid])
        //console.log(resultadoEliminar)
        if (resultadoEliminar.affectedRows === 0) {
            throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' }
        }
        else {
            return { status: 200, message: 'PRODUCTO CON ID ' + pid + ' ELIMINADO CORRECTAMENTE' }
        }

    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
        }
    }
}


/*const seleccionarTodosLosProductos = async () => {
    try {
        const seleccionarTodos = 'SELECT * FROM products'
        const resultadoSeleccionarTodos = await query(seleccionarTodos)
        return resultadoSeleccionarTodos
    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
        }
    }
}*/

const seleccionarTodosLosProductos = async () => {
    try {
        const seleccionarTodos = 'SELECT p.id as product_id, p.title as product_title, p.brand as product_brand, p.price as product_price, i.id as image_id, i.imgSource as image_source FROM products p LEFT JOIN images i ON p.id = i.productid';
        const resultadoSeleccionarTodos = await query(seleccionarTodos);
        // Procesar los resultados para obtener el formato deseado
        const products = [];
        resultadoSeleccionarTodos.forEach(result => {
            let existingProduct = products.find(p => p.id === result.product_id);
            if (!existingProduct) {
                existingProduct = {
                    id: result.product_id,
                    title: result.product_title,
                    brand: result.product_brand,
                    price: result.product_price,
                    images: []
                };
                products.push(existingProduct);
            }
            existingProduct.images.push({
                id: result.image_id,
                imgSource: result.image_source
            });
        });
        return products;
    } catch (error) {
        if (error.status === 404) {
            throw error;
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' };
        }
    }
}

const modificarProductoPorId = async (pid, producto) => {
    const { titulo, imagen, descripcion, stock, precio, codigo } = producto
    try {
        const modificar = 'UPDATE productos SET titulo = ?, imagen = ?, descripcion = ?, stock = ?, precio = ?, codigo = ? WHERE id = ?'
        const valores = [titulo, imagen, descripcion, stock, precio, codigo, pid]
        const resultadoModificar = await query(modificar, valores)
        if (resultadoModificar.affectedRows === 0) {
            throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' }
        }
        /*else {
            return { status: 200, message: 'PRODUCTO CON ID ' + pid + ' MODIFICADO CORRECTAMENTE' }
        }*/
    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {

            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
        }
    }
}
module.exports = { insertarProducto, seleccionarProductoPorId, eliminarProductoPorId, seleccionarTodosLosProductos, modificarProductoPorId }