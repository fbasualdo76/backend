const { getAllCategoriesService } = require("./categories.service")

const getAllCategoriesController = async (req, res) => {//selecciona todas las categorias.
    try {
        const categorias = await getAllCategoriesService()
        //res.status(200).json(categorias)//MAL. DEVUELVE DIRECTAMENTE UN ARRAY [ { id: 1, category_name: 'HOMBRE', image_url: '...' }, ... ]
        res.status(200).json({ status: 200, categories: categorias }); // DEVUELVE UN OBJETO CON UNA PROPIEDAD (CATEGORIES) { categories: [ {...}, {...} ] }

    } catch (error) {
        res.status(error.status).json(error)
    }
}

module.exports = { getAllCategoriesController }