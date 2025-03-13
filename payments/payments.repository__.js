//PAYMENTS.REPOSITORY.JS
//Payment se utiliza para procesar pago con tarjeta o pago directo, pero en este caso, lo utilizaremos para crear una preferencia de pago ya que la opcion para solamente crear una preferencia no funciona "const response = await mercadopago.preferences.create(preference);".
const { MercadoPagoConfig, Payment, Preference } = require('mercadopago');

//const mercadopago = require("mercadopago");## ASI DICE MERCDOPAGO, no funciona ##
//mercadopago.MercadoPagoConfig({ access_token: process.env.MP_ACCESS_TOKEN, });## ASI DICE MERCDOPAGO, no funciona ##

// Configuración del cliente con el Access Token
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });
const payment = new Payment(client);
//const preference = new Preference(client);

const crearPago = async (productos) => {
  const body = {//TIENE QUE LLAMARSE "body"
    transaction_amount: productos?.amount || 100,
    payment_method_id: 'rapipago',
    //description: productos?.description || 'Compra en mi tienda',    
    //payer: { email: productos?.email || 'test@test.com' }
  };

  // Crear un objeto de preferencia ## ASI DICE MERCDOPAGO, no funciona ##
  const bodyPreference = {
    // el "purpose": "wallet_purchase" solo permite pagos registrados
    // para permitir pagos de guests puede omitir esta propiedad
    "purpose": "wallet_purchase",
    "items": [
      {
        "id": "item-ID-1234",
        "title": "Meu produto",
        "quantity": 1,
        "unit_price": 75.76
      }
    ]
  };
  try {
    const response = await payment.create({ body });
    //const response = await mercadopago.preferences.create(bodyPreference);## ASI DICE MERCDOPAGO, no funciona ##
    //const response = await preference.create(bodyPreference);
    //console.log('Preferencia creada exitosamente:', response);
    return response;
  } catch (error) {
    console.error('Error al crear la preferencia:', error.response ? error.response.data : error.message);
    throw new Error('No se pudo crear la preferencia de pago.');
  };

};

module.exports = { crearPago };