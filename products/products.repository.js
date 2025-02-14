const { query } = require("../config/connection.sql")

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
        const seleccionarTodos = 'SELECT p.id as product_id, p.title as product_title, p.brand as product_brand, p.price as product_price, p.rating as product_rating, p.comments_count as product_comments_count, i.id as image_id, i.imgSource as image_source FROM products p LEFT JOIN images i ON p.id = i.productid'
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
                    rating: result.product_rating,
                    comments_count: result.product_comments_count,
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

/*const seleccionarProductoPorId = async (pid) => {
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
}*/

/*const seleccionarProductoPorId = async (pid) => {
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
}*/

const seleccionarProductoPorIdVIEJA = async (pid) => {
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
const seleccionarProductoPorId = async (pid) => {
    try {
        const seleccionar = 'SELECT p.id as product_id, p.title as product_title, p.brand as product_brand, p.price as product_price, c.color_code as color_code, s.size_name as size_name, i.id as image_id, i.imgSource as image_source FROM products p LEFT JOIN product_variants pv ON p.id = pv.product_id LEFT JOIN colors c ON pv.color_id = c.id LEFT JOIN sizes s ON pv.size_id = s.id LEFT JOIN images i ON i.productid = p.id WHERE p.id = ?';
        const resultadoSeleccionar = await query(seleccionar, [pid]);
        if (resultadoSeleccionar.length === 0) {
            throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' }
        } else {
            const product = {
                id: resultadoSeleccionar[0].product_id,
                title: resultadoSeleccionar[0].product_title,
                brand: resultadoSeleccionar[0].product_brand,
                price: resultadoSeleccionar[0].product_price,
                rating: 4.5,
                comments_count: 100,
                images: [],
                sizes: [],
                colors: []
            };

            resultadoSeleccionar.forEach(result => {
                const existingImage = product.images.find(img => img.id === result.image_id);
                if (!existingImage) {
                    product.images.push({
                        id: result.image_id,
                        imgSource: result.image_source
                    });
                }

                if (!product.sizes.includes(result.size_name)) {
                    product.sizes.push(result.size_name);
                }

                if (!product.colors.includes(result.color_code)) {
                    product.colors.push(result.color_code);
                }
            });

            return product;
        }
    } catch (error) {
        if (error.status === 404) {
            throw error;
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' };
        }
    }
}

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

module.exports = { insertarProducto, seleccionarProductoPorId, eliminarProductoPorId, seleccionarTodosLosProductos, modificarProductoPorId }