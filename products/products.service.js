const { insertarProducto, seleccionarProductoPorId, eliminarProductoPorId, seleccionarTodosLosProductos, modificarProductoPorId } = require("./products.repository");
const { validarProducto } = require("./utils/validation.Product.Util")

const postProductService = async (producto) => {//En el servicio recibo el producto.
    try {
        //console.log(producto)
        validarProducto(producto)
        const idCreado = await insertarProducto(producto)//tomo el id del producto creado en el repositorio
        return { status: 200, message: `PRODUCTO REGISTRADO CORRECTAMENTE CON ID: ${idCreado}`, idCreado: idCreado }
    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}

const getProductByIdService = async (pid) => {
    try {
        const product = await seleccionarProductoPorId(pid)
        return { status: 200, message: 'PRODUCTO ENCONTRADO', product: product }
    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}

const deleteProductByIdService = async (pid) => {
    try {
        const producto = await eliminarProductoPorId(pid)
        return { status: 200, message: 'PRODUCTO ELIMINADO CORRECTAMENTE' }
    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}

const getAllProductsService = async () => {
    try {
        const products = await seleccionarTodosLosProductos()
        return { status: 200, message: 'PRODUCTOS ENCONTRADOS', products: products }
    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}

const putProductByIdService = async (pid, producto) => {
    try {
        validarProducto(producto)
        const modificarProducto = await modificarProductoPorId(pid, producto)
        return { status: 200, message: 'PRODUCTO MODIFICADO CORRECTAMENTE' }
    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}
module.exports = { postProductService, getProductByIdService, deleteProductByIdService, getAllProductsService, putProductByIdService }