const { postProductService, getProductByIdService, deleteProductByIdService, getAllProductsService, putProductByIdService } = require('./products.service')
const postProductController = async (req, res) => {//Este controlador va encargarse de recibir título, precio,descripción,stock,código y se lo va pasar al servicio del producto y el servicio se encargará de validar que el objeto recibido tenga las propiedades correspondientes
    //const { title, price, description, stock, codigo } = req.body
    try {
        const resultado = await postProductService(req.body)//tomo el body completo, osea, todas la propiedades del objeto, las propiedades necesarias y las no necesarias.
        res.status(200).json(resultado)
    } catch (error) {
        res.status(error.status).json(error)
    }
}

const getProductByIdController = async (req, res) => {
    try {
        const { pid } = req.params//obtenemos el pid de los parametros (de consulta).

        if (!(pid && !isNaN(pid))) {
            throw { status: 400, message: 'EL ID DEBE SER UN NÚMERO.' }
        }

        const resultado = await getProductByIdService(pid)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(error.status).json(error)
    }

}

const deleteProductByIdController = async (req, res) => {
    try {
        const { pid } = req.params//obtenemos el pid de los parametros (de consulta).

        if (!(pid && !isNaN(pid))) {
            throw { status: 400, message: 'EL ID DEBE SER UN NÚMERO.' }
        }

        const resultado = await deleteProductByIdService(pid)
        res.status(200).json(resultado)

    } catch (error) {
        res.status(error.status).json(error)
    }
}

const getAllProductsController = async (req, res) => {
    try {
        const resultado = await getAllProductsService()
        res.status(200).json(resultado)
    } catch (error) {
        res.status(error.status).json(error)
    }
}

const putProductByIdController = async (req, res) => {
    try {
        const { pid } = req.params//obtenemos el pid de los parametros (de consulta).

        if (!(pid && !isNaN(pid))) {
            throw { status: 400, message: 'EL ID DEBE SER UN NÚMERO.' }
        }
        //console.log(pid, req.body)
        const resultado = await putProductByIdService(pid, req.body)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(error.status).json(error)
    }
}

const getAllProductsPaginationController = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const products = await getAllProductsService();
      const paginatedProducts = products.slice(startIndex, endIndex);
  
      const response = {
        products: paginatedProducts,
        page: page,
        next: products.length > endIndex ? page + 1 : null,
        prev: page > 1 ? page - 1 : null
      };
  
      res.status(200).json(response);
    } catch (error) {
      res.status(error.status).json(error);
    }
  }
module.exports = { postProductController, getProductByIdController, deleteProductByIdController, getAllProductsController, putProductByIdController, getAllProductsPaginationController }