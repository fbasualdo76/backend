//PAYMENTS.CONTROLLER.JS
const { crearPreferencia, manejarPago, obtenerPagoPorId } = require("./payments.repository");
//GENERA EL ID DE LA PREFERENCIA
const generarPreferencia = async (req, res) => {
  try {
    const productos = req.body;
    const preferencia = await crearPreferencia(productos);
    console.log("preferencia.back_urls EN CONTROLLER:", preferencia.back_urls);
    // Devolvemos la preferencia con "EL CODIGO DE ESTADO HTTP" 200 (éxito)
    res.status(200).json({
      preferenceId: preferencia.id,
      external_reference: preferencia.external_reference,
      back_urls: preferencia.back_urls,
      init_point: preferencia.init_point,
      sandbox_init_point: preferencia.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error al generar la preferencia:", error);
    res.status(500).json({ error: "NO SE PUDO GENEREAR LA PREFERENCIA DE PAGO." });
  }
};

// Procesar el pago con tarjeta de crédito/débito.
const procesarPago = async (req, res) => {
  try {
    const paymentData = req.body;
    const resultadoPago = await manejarPago(paymentData);
    res.status(200).json({ message: "PAGO EXISTOSO - CONTROLLER.", resultadoPago });
  } catch (error) {
    res.status(500).json({ error: "ERROR AL PROCESAR EL PAGO - CONTROLLER." });
  }
};
//Funcion que usa el payment_id, que devuelve mercado pago, para consultar a Mercado Pago los datos reales del pago
const consultarPago = async (req, res) => {

  const paymentId = req.query.payment_id; //RECIBO DEL FRONTEND EL payment_id POR QUERY PARAM.

  console.log('paymentId EN CONTROLLER:', paymentId); 

  if (!paymentId) {
    return res.status(400).json({ error: "Falta el payment_id en la query." });
  }
  try {
    const datosPago = await obtenerPagoPorId(paymentId);

    console.log('datosPago EN CONTROLLER:', datosPago);

    res.status(200).json({ datosPago });
  } catch (error) {
    console.error("Error al consultar el pago:", error.message);
    res.status(500).json({ error: "ERROR AL CONSULTAR EL PAGO." });
  }
};

module.exports = { generarPreferencia, procesarPago, consultarPago };