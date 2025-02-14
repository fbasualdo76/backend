const { postOrdersService } = require("./orders.service")

const postOrdersController = async (req, res) => {
    try {
        const { order_no, order_date, status, delivery_date, payment_method, cartItems, } = req.body;
        //const user = req.user; // Datos del usuario desde el token
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío." });
        }
        console.log("Usuario realizando checkout:"/*, user*/);
        const resultado = await postOrdersService({
            //user_id: user.usuario_id, 
            order_no,
            order_date,
            status,
            delivery_date,
            payment_method,
            items: cartItems
        });

        res.status(200).json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error desconocido" });
    }
}
module.exports = { postOrdersController }