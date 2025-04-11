//ORDERS.REPOSITORY.JS
const { query } = require("../config/connection.sql")

const crearOrden = async ({ date, order_status, payment_method, payment_status, total }) => {
    try {
        const insertarOrden = `
            INSERT INTO orders (date, order_status, payment_method, payment_status, total) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const valores = [date, order_status, payment_method, payment_status, total];
        const resultado = await query(insertarOrden, valores);
        return resultado.insertId; // Devuelve el ID de la orden creada
    } catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS al crear la orden.' };
    }
};
const agregarProductosAOrden = async (orderId, items) => {
    try {
        const insertarProductos = `
            INSERT INTO order_items (order_id, product_id, quantity, price, color, size) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        for (const item of items) {
            const valores = [orderId, item.id, item.quantity, item.price, item.color, item.size];
            await query(insertarProductos, valores);
        }
    } catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS al agregar productos a la orden.' };
    }
};

const actualizarOrden = async (orderId, payment_method, payment_status) => {//Actualiza el payment_method (forma de pago) y payment_status (estado de pago) de la orden.
    try {
        const actualizarQuery = `
            UPDATE orders 
            SET payment_method = ?, payment_status = ? 
            WHERE id = ?
        `;
        const valores = [payment_method, payment_status, orderId];
        await query(actualizarQuery, valores);
    } catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS al actualizar la forma de pago y el estado de pago.' };
    }
};

module.exports = { crearOrden, agregarProductosAOrden, actualizarOrden }
