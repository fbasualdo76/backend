const { postCartsService, getCartService, deleteProductFromCartService } = require("./carts.service")

const postCartsController = async (req, res) => {
    try {
        const { product_id, cantidad } = req.body
        const user = req.user//guardo en user los datos que vienen del verifyTokenMiddleware.
        console.log('ESTE ES EL USUARIO: ', user)
        //agregar validaciones de los datos o en el service.
        const resultado = await postCartsService({ user_id: user.usuario_id/*recibo del user*/, product_id, cantidad/*recibo del req.body*/ })
        res.status(200).json(resultado)
        //res.status(resultado.status).json(resultado)
    } catch (error) {
        res.status(error.status).json(error)
    }
}

const getCartsController = async (req, res) => {
    try {
        const user = req.user//guardo en user los datos que vienen del verifyTokenMiddleware.
        const resultado = await getCartService(user.usuario_id)
        res.status(200).json(resultado)

    } catch (error) {
        res.status(error.status).json(error)
    }
}

const deleteProductFromCartController = async (req, res) => {
    try {
        const { product_id } = req.params
        const user = req.user//guardo en user los datos que vienen del verifyTokenMiddleware.
        const resultado = await deleteProductFromCartService({ user_id: user.usuario_id, product_id })
        res.status(200).json(resultado)
    } catch (error) {
        res.status(error.status).json(error)
    }
}
module.exports = { postCartsController, getCartsController, deleteProductFromCartController }