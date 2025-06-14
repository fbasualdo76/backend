const { query } = require("../config/connection.sql")

const seleccionarTodasLasCategorias = async () => {//selecciona todas las categorias.
    try {
        const sql = `SELECT * FROM categories`;

        const categorias = await query(sql);

        if (!categorias.length) {
            throw {
                status: 404,
                message: 'NO SE ENCONTRARON CATEGORIAS.',
                origin: 'REPOSITORY',
            };
        }

        return categorias;

    } catch (error) {
        if (error.status) throw error;
        throw {
            status: 500,
            message: 'ERROR EN LA BASE DE DATOS AL OBTENER LAS CATEGORIAS .',
            origin: 'REPOSITORY'
        };
    }
};

module.exports = { seleccionarTodasLasCategorias }
