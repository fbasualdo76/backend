//PAYMENTS.REPOSITORY.JS
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const MPConfig = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const preference = new Preference(MPConfig);
const payment = new Payment(MPConfig);

const crearPreferencia = async (productos) => {
  const body = {//TIENE QUE LLAMARSE "body"
    items: [
      {
        orderId: productos.orderId,//EL orderId ES IMPRESCINDIBLE PARA GEREAR EL ID DE LA PREFERENCIA, ESTOY SEGURO QUE LO ESTOY ENVIANDO DESDE EL FRONTEND, ES POR ESO QUE NO UTILIZO EL ||.
        title: productos?.title || "Compra en mi tienda (BACKEND)",
        quantity: productos?.quantity || 1,
        unit_price: productos?.unit_price || 10,
      }
    ],
    back_urls: {
      success: "http://localhost:5173/confirm-wallet-payment",
      failure: "http://localhost:5173/products",
      pending: "http://localhost:5173/products"
    },
    external_reference: productos?.orderId?.toString(), // IMPORTANTE: referenciamos la orden
    //auto_return: "approved",
  };

  try {
    console.log('urls del body EN REPOSITORY:', body.back_urls)

    const response = await preference.create({ body });

    console.log('urls del response EN REPOSITORY:', response.back_urls);

    return response;
  } catch (error) {
    //console.error('Error al crear la preferencia:', error.response ? error.response.data : error.message);
    //console.error('Error al crear la preferencia:', error?.response?.data || error.message);
    throw new Error('NO SE PUDO CREAR LA PREFERENCIA DE PAGO.');
  };

};

//FUNCIÓN para manejar el pago con tarjeta de credito/debito
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
//Funcion que usa el payment_id, que devuelve mercado pago, para consultar a Mercado Pago los datos reales del pago
const obtenerPagoPorId = async (paymentId) => {
  try {
    const response = await payment.get({ id: paymentId });

    console.log('RESPONSE EN REPOSITORY:', response);

    return response;

  } catch (error) {
    console.error("ERROR al obtener el pago:", error.response?.body || error.message);
    throw new Error("NO SE PUDO OBTENER EL PAGO.");
  }
};

module.exports = { crearPreferencia, manejarPago, obtenerPagoPorId };