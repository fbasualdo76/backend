//PAYMENTS.REPOSITORY.JS
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const MPConfig = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const preference = new Preference(MPConfig);
const payment = new Payment(MPConfig);
//HASTA ACA.

const crearPreferencia = async (productos) => {

  const body = {//TIENE QUE LLAMARSE "body"
    items: [
      {
        id: "item-ID-1234",
        title: productos?.title || "Compra en mi tienda (BACKEND)",
        quantity: 1,
        unit_price: productos?.unit_price || 10,
      }
    ],
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending"
    },
    auto_return: "approved",
  };

  try {
    const response = await preference.create({ body });
    //console.log('Preferencia creada exitosamente:', response);
    return response;
  } catch (error) {
    //console.error('Error al crear la preferencia:', error.response ? error.response.data : error.message);
    throw new Error('NO SE PUDO CREAR LA PREFERENCIA DE PAGO.');
  };

};

// NUEVA FUNCIÓN para manejar el pago
const manejarPago = async (paymentData) => {
  try {
    const response = await payment.create({
      body: {
        token: paymentData.token,
        //issuer_id: paymentData.issuer_id,
        payment_method_id: paymentData.payment_method_id,
        transaction_amount: paymentData.transaction_amount,
        installments: paymentData.installments,
        description: "Compra en mi tienda",     
        payer: {
          email: paymentData.payer.email,
          identification: {
            type: paymentData.payer.identification.type,
            number: paymentData.payer.identification.number,
          },
        }
      }
    });
    //console.log('response:', response);
    return response;

  } catch (error) {
    console.error("MERCADOPAGO ERROR:", error.response?.body || error.message);
    throw new Error("ERROR AL PROCESAR EL PAGO - REPOSITORY.");
  }
};

module.exports = { crearPreferencia, manejarPago };