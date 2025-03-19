//ORDERS.SERVICE.JS
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
        /*return {
            status: 200,
            message: 'ORDEN CREADA CORRECTAMENTE.',
            id: orderId,
            order_no: order_no,
            order_date: order_date,
            estado: status,//es "status: status", pero le pongo "estado: status" para que no genere conflicto con el "status: 200".
            delivery_date: delivery_date,
            payment_method: payment_method,
            items: items
        };*/
        return {
            status: 200,
            message: 'ORDEN CREADA CORRECTAMENTE.',
            orderData: [
                {
                    id: orderId,
                    order_no: order_no,
                    order_date: order_date,
                    status: status, // No renombramos aquí para evitar confusión
                    delivery_date: delivery_date || "Fecha de entrega no disponible",
                    payment_method: payment_method,
                    total: total,
                    items: items
                    /*items: items.map((item) => ({
                        id: `product_${item.id}`,
                        title: item.title,
                        color: item.color,
                        quantity: item.quantity,
                        price: item.price,
                        imgSource: item.imgSource
                    }))*/
                }
            ]
        };

    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' };
        }
    }
};
module.exports = { postOrdersService }