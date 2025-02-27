//PAYMENTS.REPOSITORY.JS
const { MercadoPagoConfig, Payment } = require('mercadopago');
// Configuración del cliente con el Access Token
const client = new MercadoPagoConfig({ accessToken: 'TEST-4346990445233014-022509-2a0bc8ea1059c3495a98e7a4f6c81f33-58948365', options: { timeout: 5000, idempotencyKey: 'abc' } });
const payment = new Payment(client);

const crearPago = async () => {
  const body = {
    transaction_amount: 100,
    description: '',
    payment_method_id: 'rapipago', // ID obtenido de la respuesta de Postman
    payer: {
      email: 'fbasualdo76@gmail.com'
    }
  };

  try {
    const response = await payment.create({ body });
    //console.log('Preferencia creada exitosamente:', response);
    return response;
  } catch (error) {
    console.error('Error al crear la preferencia:', error.response ? error.response.data : error.message);
    throw new Error('No se pudo crear la preferencia de pago.');
  }
};

module.exports = { crearPago };