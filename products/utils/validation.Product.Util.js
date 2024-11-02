const PROPIEDADES_NECESARIAS = ['titulo', 'descripcion', 'stock', 'precio', 'codigo', 'imagen']//defino las propiedades que son necesarias.
const VALIDACIONES_PROPIEDADES = {
    'precio': {
        validacion: (valor) => {
            return Boolean(valor) && !isNaN(valor) && valor > 1
        },
        errorText: 'PRECIO ES OBLIGATORIO, DEBE SER UN NÚMERO Y DEBE SER MAYOR A 1.'
    },
    'titulo': {
        validacion: (valor) => {
            return Boolean(valor) && (typeof (valor) === 'string') && valor.length > 3
        },
        errorText: 'TÍTULO ES OBLIGATORIO, DEBE SER UN STRING Y DEBE TENER MÁS DE 3 CARACTERES.'
    },
    'stock': {
        validacion: (valor) => {
            return (Boolean(valor) && !isNaN(valor) && valor >= 1)
        },
        errorText: 'STOCK ES OBLIGATORIO, DEBE SER UN NÚMERO Y DEBE SER MAYOR O IGUAL A 1.'
    },
    'descripcion': {
        validacion: (valor) => {
            return (Boolean(valor) && isNaN(valor) && valor.length > 20 && typeof (valor) === 'string')
        },
        errorText: 'DESCRIPCIÓN ES OBLIGATORIA, DEBE SER UN STRING Y DEBE TENER MÍNIMO 20 CARACTERES.'
    },
    'codigo': {
        validacion: (valor) => {
            return (Boolean(valor) && valor.length > 3)
        },
        errorText: 'CÓDIGO ES OBLIGATORIO Y DEBE TENER MÍNIMO 3 CARACTERES.'
    },
    'imagen': {
        validacion: (valor) => {
            return (Boolean(valor) && isNaN(valor) && valor.length > 50 && typeof (valor) === 'string')
        },
        errorText: 'IMAGEN ES OBLIGATORIA, DEBE SER UN STRING Y DEBE TENER MÍNIMO 50 CARACTERES.'
    }
}

const validarProducto = (producto) => {
    const PROPIEDADES_PRODUCTO = Object.keys(producto)//tomo TODAS las propiedades del producto, las que vienen por body, necesarias y no necesarias.
    const PROPIEDADES_FALTANTES = []
    const PROPIEDADES_SOBRANTES = []

    //verificamos que no haya propiedades de menos (FALTANTES).
    for (let property of PROPIEDADES_NECESARIAS) {
        if (!PROPIEDADES_PRODUCTO.includes(property)) {
            PROPIEDADES_FALTANTES.push(property)
        }
    }
    if (PROPIEDADES_FALTANTES.length > 0) {
        throw { status: 400, message: 'FALTAN LAS PROPIEDADES [' + PROPIEDADES_FALTANTES.join(', ') + ']' }
    }

    //verificamos que no haya propiedades de más (SOBRANTES).
    for (let property of PROPIEDADES_PRODUCTO) {
        if (!PROPIEDADES_NECESARIAS.includes(property)) {
            PROPIEDADES_SOBRANTES.push(property)
        }
    }
    if (PROPIEDADES_SOBRANTES.length > 0) {
        throw { status: 400, message: 'SOBRAN LAS PROPIEDADES [' + PROPIEDADES_SOBRANTES.join(', ') + ']' }
    }

    //verificamos que las propiedades sean validas.
    for (let property in VALIDACIONES_PROPIEDADES) {
        let valor = producto[property]
        if (!VALIDACIONES_PROPIEDADES[property].validacion(valor)) {
            throw { status: 400, message: VALIDACIONES_PROPIEDADES[property].errorText }
        }
    }
}
module.exports = { validarProducto }