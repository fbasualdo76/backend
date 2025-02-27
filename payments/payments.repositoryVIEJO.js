// src/payments/payments.repository.js
const { MercadoPagoConfig } = require('mercadopago');

// Configuración del cliente con el Access Token
const mercadoPago = new MercadoPagoConfig({
  accessToken: "TEST-4346990445233014-022509-2a0bc8ea1059c3495a98e7a4f6c81f33-58948365",
  options: { timeout: 5000 }
});

const crearPreferencia = async (productos) => {
  const items = productos.map((producto) => ({
    title: producto.nombre,
    unit_price: producto.precio,
    quantity: producto.cantidad,
    currency_id: "ARS",
  }));

  const preferenceData = {
    items,
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
    },
    auto_return: "approved",
  };

  try {
    // La llamada correcta para crear la preferencia
    const response = await mercadoPago.preferences.create({ body: preferenceData });
    return response.body;
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    throw new Error("No se pudo crear la preferencia de pago.");
  }
};

module.exports = { crearPreferencia };