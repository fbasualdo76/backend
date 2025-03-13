//PAYMENTS.REPOSITORY.JS
const { MercadoPagoConfig, Preference } = require('mercadopago');
const MPConfig = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const preference = new Preference(MPConfig);

const crearPreferencia = async (productos) => {

  const body = {//TIENE QUE LLAMARSE "body"
    items: [
      {
        id: "item-ID-1234",
        title: productos?.title || "Compra en mi tienda en backend",
        quantity: 1,
        unit_price: productos?.unit_price || 100,
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

module.exports = { crearPreferencia };