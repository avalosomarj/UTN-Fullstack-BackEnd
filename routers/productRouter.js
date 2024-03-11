const express = require('express')
const { getAllProductsController, getOneProductByIdController, postCreateProductController, deleteProductByIdController, putUpdateProductByIdController } = require('../controllers/productController')

const productRouter = express.Router()

productRouter.get('/', getAllProductsController)
productRouter.get('/:pid', getOneProductByIdController)

productRouter.post('/', postCreateProductController)

productRouter.put('/:pid', putUpdateProductByIdController)

productRouter.delete('/:pid', deleteProductByIdController)

module.exports = productRouter