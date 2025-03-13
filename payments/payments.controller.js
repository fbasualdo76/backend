//PAYMENTS.CONTROLLER.JS
const { crearPreferencia } = require("./payments.repository");

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

module.exports = { generarPreferencia };