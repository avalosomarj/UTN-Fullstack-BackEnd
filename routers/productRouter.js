const express = require('express')
const { getAllProductsController, getOneProductByIdController, postCreateProductController, deleteProductByIdController, putUpdateProductByIdController, postUploadImgProductController } = require('../controllers/productController')

const productRouter = express.Router()

productRouter.get('/', getAllProductsController)
productRouter.get('/:pid', getOneProductByIdController)

productRouter.post('/', postCreateProductController)
productRouter.post('/upload', postUploadImgProductController)

productRouter.put('/:pid', putUpdateProductByIdController)

productRouter.delete('/:pid', deleteProductByIdController)

module.exports = productRouter