//PAYMENTS.CONTROLLER.JS
const { crearPago } = require("./payments.repository");

const generarPreferencia = async (req, res) => {
  try {
    const productos = req.body;
    const preferencia = await crearPago(productos);
    //console.log('Preferencia recibida en el controller:', preferencia);
    res.json({ preferenceId: preferencia?.id || 'ID no disponible' });
  } catch (error) {
    console.error('Error al generar la preferencia:', error); // Mostrar el error completo
    res.status(500).json({ error: 'No se pudo generar la preferencia de pago.' });
  }
};

module.exports = { generarPreferencia };
