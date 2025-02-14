const { crearOrden, agregarProductosAOrden } = require("./orders.repository")

const postOrdersService = async (datos) => {
    try {
        const { order_no, order_date, status, delivery_date, payment_method, items } = datos;
        // Calcular el total sumando los precios de cada producto
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        // Insertar la orden en la base de datos
        const orderId = await crearOrden({ order_no, order_date, status, delivery_date, payment_method, total });
        // Insertar los productos de la orden en la base de datos
        await agregarProductosAOrden(orderId, items);
        return { status: 200, message: 'ORDEN CREADA CORRECTAMENTE.', orderId };
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' };
        }
    }
};
module.exports = { postOrdersService }