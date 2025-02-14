const { query } = require("../config/connection.sql")

const crearOrden = async ({ order_no, order_date, status, delivery_date, payment_method, total }) => {
    try {
        const insertarOrden = `
            INSERT INTO orders (order_no, order_date, status, delivery_date, payment_method, total) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const valores = [order_no, order_date, status, delivery_date, payment_method, total];
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
module.exports = { crearOrden, agregarProductosAOrden }
