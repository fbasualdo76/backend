const express = require('express')
const { getAllCategoriesController } = require('./categories.controller')
const { verifyTokenMiddleware } = require('../auth/auth.middleware')

const categoriesRouter = express.Router()

//TODO: AGREGAR MIDDLEWARE DE VERIFICACIÓN DE TOKEN.

//api/categories

categoriesRouter.get('/', getAllCategoriesController)

module.exports = { categoriesRouter }