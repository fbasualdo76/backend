//ORDERS.CONTROLLER.JS
const { postOrdersService, putOrdersService } = require("./orders.service")

const postOrdersController = async (req, res) => {
    try {
        const { date, order_status, payment_method, payment_status, cartItems } = req.body;
        //const user = req.user; // Datos del usuario desde el token
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "EL CARRITO ESTA VACIO." });
        }
        //console.log("Usuario realizando checkout:"/*, user*/);
        const resultado = await postOrdersService({
            //user_id: user.usuario_id, 
            //order_no,
            date,
            order_status,
            payment_method,
            payment_status,
            items: cartItems,

        });

        res.status(200).json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error desconocido" });
    }
}

const putOrdersController = async (req, res) => {//Actualiza el payment_method (forma de pago) y payment_status (estado de pago) de la orden.
    try {
        const { id } = req.params;
        const { payment_method, payment_status } = req.body;

        if (!payment_method || !payment_status) {
            return res.status(400).json({ message: "FORMA DE PAGO Y ESTADO DE PAGO SON OBLIGATORIOS." });
        }

        const resultado = await putOrdersService(id, payment_method, payment_status);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error al actualizar el estado de pago." });
    }
};
module.exports = { postOrdersController, putOrdersController }