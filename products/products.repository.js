//PRODUCTS.REPOSITORY.JS
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

const seleccionarTodosLosProductos_VERSION_CORTA = async () => {//Funcion corta de seleccionarTodosLosProductos. Trae todas las imagenes.
    try {
        const seleccionarTodos = `
            SELECT 
                p.id AS product_id,
                p.title AS product_title,
                p.brand AS product_brand,
                p.price AS product_price,
                p.rating AS product_rating,
                p.comments_count AS product_comments_count,
                i.id AS image_id,
                i.imgSource AS image_source
            FROM products p
            JOIN product_variant pv ON pv.product_id = p.id
            JOIN images i ON i.product_variant_id = pv.id
        `;
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

const seleccionarTodosLosProductos = async () => {//Funcion extendida de seleccionarTodosLosProductos. Trae todas las imagenes, categorias y variantes.
    try {
        const sql = `
            SELECT 
                p.id AS product_id,
                p.title AS product_title,
                p.brand AS product_brand,
                p.price AS product_price,
                p.rating AS product_rating,
                p.comments_count AS product_comments_count,

                -- imágenes
                i.id AS image_id,
                i.imgSource AS image_source,

                -- categorías
                c.id AS category_id,
                c.category_name AS category_name,

                -- variantes
                pv.id AS variant_id,
                pv.stock AS variant_stock,
                col.id AS color_id,
                col.color_name AS color_name,
                col.color_code AS color_code,
                s.id AS size_id,
                s.size_name AS size_name

            FROM products p

            -- imágenes
            LEFT JOIN product_variant pv ON pv.product_id = p.id
            LEFT JOIN images i ON i.product_variant_id = pv.id

            -- categorías
            LEFT JOIN product_category pc ON pc.product_id = p.id
            LEFT JOIN categories c ON c.id = pc.category_id

            -- color y talle de variantes
            LEFT JOIN colors col ON col.id = pv.color_id
            LEFT JOIN sizes s ON s.id = pv.size_id
        `;

        const results = await query(sql);

        const products = [];

        results.forEach(row => {
            let product = products.find(p => p.id === row.product_id);
            if (!product) {
                product = {
                    id: row.product_id,
                    title: row.product_title,
                    brand: row.product_brand,
                    price: row.product_price,
                    rating: row.product_rating,
                    comments_count: row.product_comments_count,
                    images: [],
                    categories: [],
                    variant: []
                };
                products.push(product);
            }

            // Imágenes
            if (row.image_id && !product.images.find(img => img.id === row.image_id)) {
                product.images.push({
                    id: row.image_id,
                    imgSource: row.image_source
                });
            }

            // Categorías
            if (row.category_id && !product.categories.find(cat => cat.id === row.category_id)) {
                product.categories.push({
                    id: row.category_id,
                    name: row.category_name
                });
            }

            // Variantes
            if (row.variant_id && !product.variant.find(v => v.id === row.variant_id)) {
                product.variant.push({
                    id: row.variant_id,
                    stock: row.variant_stock,
                    color: {
                        id: row.color_id,
                        name: row.color_name,
                        code: row.color_code
                    },
                    size: {
                        id: row.size_id,
                        name: row.size_name
                    }
                });
            }
        });

        return products;

    } catch (error) {
        throw { status: 500, message: 'ERROR AL OBTENER PRODUCTOS CON DETALLE COMPLETO.' };
    }
};

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
        //console.log('PID RECIBIDO:', pid);
        const seleccionar = `
      SELECT 
        p.id as product_id,
        p.title as product_title,
        p.brand as product_brand,
        p.price as product_price,
        p.rating as product_rating,
        p.comments_count as product_comments_count,
        
        i.id as image_id,
        i.imgSource as image_source,
        
        s.size_name as size_name,
        c.color_name as color_name,
        c.color_code as color_code,
        
        cat.id as category_id,
        cat.category_name as category_name

      FROM products p
      LEFT JOIN product_variant pv ON p.id = pv.product_id
      LEFT JOIN sizes s ON pv.size_id = s.id
      LEFT JOIN colors c ON pv.color_id = c.id
      LEFT JOIN images i ON i.product_variant_id = pv.id
      LEFT JOIN product_category pc ON p.id = pc.product_id
      LEFT JOIN categories cat ON pc.category_id = cat.id
      WHERE p.id = ?
    `;
        const resultadoSeleccionar = await query(seleccionar, [pid]);
        //console.log('RESULTADO DB:', resultadoSeleccionar);
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
                colors: [],
                categories: []
            };

            resultadoSeleccionar.forEach(result => {
                // imágenes
                if (result.image_id && !product.images.find(img => img.id === result.image_id)) {
                    product.images.push({ id: result.image_id, imgSource: result.image_source });
                }

                // talles
                if (result.size_name && !product.sizes.includes(result.size_name)) {
                    product.sizes.push(result.size_name);
                }

                // colores
                if (result.color_code && !product.colors.find(c => c.code === result.color_code)) {
                    product.colors.push({ name: result.color_name, code: result.color_code });
                }

                // categorías
                if (result.category_id && !product.categories.find(cat => cat.id === result.category_id)) {
                    product.categories.push({ id: result.category_id, name: result.category_name });
                }
            });

            return product;
        }
    } catch (error) {
        //console.error('ERROR EN seleccionarProductoPorId:', error);
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