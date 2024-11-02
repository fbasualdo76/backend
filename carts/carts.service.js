const { crearCarrito, agregarAlCarrito, obtenerCarritoDetallado, eliminarProductoDelCarrito } = require("./carts.repository")

const postCartsService = async (datos) => {// datos viene de postCartsController.
    try {
        const { user_id, product_id, cantidad } = datos
        const carrito = await crearCarrito(user_id)
        const carritoId = carrito.id//id igual que en la bd.
        await agregarAlCarrito(carritoId, product_id, cantidad)
        return { status: 200, message: 'PRODUCTO AGREGADO AL CARRITO CORRECTAMENTE' }

    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}

const getCartService = async (user_id) => {
    try {
        const carrito = await crearCarrito(user_id)//En caso de que no exista un carrito lo vamos a crear, y si existe lo vamos a obtener.
        const carritoId = carrito.id//id igual que en la bd.
        const carritoDetallado = await obtenerCarritoDetallado(carritoId)
        return { status: 200, message: 'CARRITO OBTENIDO', carrito: carritoDetallado }
    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}

const deleteProductFromCartService = async ({ user_id, product_id }) => {
try {
    const carrito = await crearCarrito(user_id)
    await eliminarProductoDelCarrito(carrito.id, product_id)
    const carritoDetallado = await obtenerCarritoDetallado(carrito.id)
    return { status: 200, message: 'PRODUCTO ELIMINADO DEL CARRITO CORRECTAMENTE', carrito: carritoDetallado }
} catch (error) {
    if (error.status) {
        throw error
    }
    else {
        throw { status: 500, message: 'ERROR DESCONOCIDO.' }
    }
}    
}

module.exports = { postCartsService, getCartService, deleteProductFromCartService }




