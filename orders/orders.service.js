//ORDERS.SERVICE.JS
const { crearOrden, agregarProductosAOrden, actualizarOrden } = require("./orders.repository")

const postOrdersService = async (datos) => {
    try {
        const { date, order_status, payment_method, payment_status, items } = datos;
        // Calcular el total sumando los precios de cada producto
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        // Insertar la orden en la base de datos
        const orderId = await crearOrden({ date, order_status, payment_method, payment_status, total });
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
                    //order_no: order_no,
                    date: date,
                    order_status: order_status,
                    //delivery_date: delivery_date || "Fecha de entrega no disponible",
                    payment_method: payment_method,
                    payment_status: payment_status,
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

const putOrdersService = async (orderId, payment_method, payment_status) => {//Actualiza el payment_method (forma de pago) y payment_status (estado de pago) de la orden.
    try {
        await actualizarOrden(orderId, payment_method, payment_status);
        return {
            status: 200,
            message: 'FORMA DE PAGO Y ESTADO DE PAGO ACTUALIZADOS CORRECTAMENTE.',//Estado de pago actualizado correctamente.'
        };
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' };
        }
    }








};


module.exports = { postOrdersService, putOrdersService }