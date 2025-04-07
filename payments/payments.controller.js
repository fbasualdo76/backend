//PAYMENTS.CONTROLLER.JS
const { crearPreferencia, manejarPago } = require("./payments.repository");

const generarPreferencia = async (req, res) => {
  try {
    const productos = req.body;
    const preferencia = await crearPreferencia(productos);
    // Devolvemos la preferencia con "EL CODIGO DE ESTADO HTTP" 200 (éxito)
    res.status(200).json({
      preferenceId: preferencia.id,
    });
  } catch (error) {
    //console.error("Error al generar la preferencia:", error);
    res.status(500).json({ error: "NO SE PUDO GENEREAR LA PREFERENCIA DE PAGO." });
  }
};

// NUEVA FUNCIÓN para procesar el pago con tarjeta de crédito/débito
const procesarPago = async (req, res) => {
  try {
    const paymentData = req.body;
    const resultadoPago = await manejarPago(paymentData);
    res.status(200).json({ message: "PAGO EXISTOSO - CONTROLLER.", resultadoPago });
  } catch (error) {
    res.status(500).json({ error: "ERROR AL PROCESAR EL PAGO - CONTROLLER." });
  }
};

module.exports = { generarPreferencia, procesarPago };