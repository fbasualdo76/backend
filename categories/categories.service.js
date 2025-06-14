const { seleccionarTodasLasCategorias } = require("./categories.repository")

const getAllCategoriesService = async () => {//selecciona todas las categorias.
    try {
        return await seleccionarTodasLasCategorias();
    } catch (error) {
        if (error.status) throw error;

        throw {
            status: 500,
            message: 'ERROR AL OBTENER LAS CATEGORIAS.',
            origin: 'SERVICE',
        };
    }
};

module.exports = { getAllCategoriesService }