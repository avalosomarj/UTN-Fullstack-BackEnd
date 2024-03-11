const { getAllProducts, getOneProductById, postCreateProduct, deleteProductById, putUpdateProductById } = require('../services/productService')

const getAllProductsController = async (req, res) => {
    const result = await getAllProducts()
    
    if(!result){
        return res.status(500).json({message: 'Internal server error', status: 500})
    }
    else if(result == 404){
        return res.status(404).json({message: 'ERROR: Not found', status: 404})
    }
    else{
        return res.status(200).json({message: 'Products loaded successfully', status: 200, products: result})
    }
}

const getOneProductByIdController = async (req, res) =>{
    const {pid} = req.params
    const result = await getOneProductById(pid)
    
    if(!result){
        return res.status(500).json({message: 'Internal server error', status: 500})
    }
    else if(result == 404){
        return res.status(404).json({message: 'Product id not found', status: 404})
    }
    else{
        return res.status(200).json({message: 'Product loaded successfully', status: 200, product: result})
    }
}

const postCreateProductController = async (req, res) => {
    const {nombre, precio, stock, descripcion, img} = req.body

    if(!nombre || !precio || !stock || !descripcion || !img) {
        return res.status(400).json({message: 'ERROR: Bad request'})
    }

    const result = await postCreateProduct({nombre, img, precio, descripcion, stock})

    if(!result){
        return res.status(500).json({message: 'Internal server error', status: 500})
    }
    else{
        return res.status(201).json({message: 'Product created successfully', status: 201, result: result[0]})
    }
}

const deleteProductByIdController = async (req, res) => {
    const {pid} = req.params
    const result = await deleteProductById(pid)

    if(!result){
        return res.status(500).json({message: 'Internal server error', status: 500})
    }
    else if(result == 404){
        res.status(404).json({message: 'Product id not found', status: 404})
    }
    else{
        return res.status(200).json({message: 'Product removed successfully', status: 200})
    }
}

const putUpdateProductByIdController = async (req, res) => {
    const {nombre, precio, stock, descripcion, id, img} = req.body

    if(!id || !nombre || !precio || !stock || !descripcion || !img) {
        return res.status(400).json({message: 'ERROR: Bad request'})
    }

    const result = await putUpdateProductById({nombre, precio, stock, descripcion, id, img})

    if(!result){
        return res.status(500).json({message: 'Internal server error', status: 500})
    }
    else if(result == 404){
        res.status(404).json({message: 'Product id not found', status: 404})
    }
    else{
        return res.status(200).json({message: 'Product updated successfully', status: 200})
    }
}

const postUploadImgProductController = async (req, res) => {
    const image = req.files.file

    image.mv(`./public/img/${image.name}`, err => {
        if(err){
            return res.status(500).json({message: err, status: 500})
        }

        return res.status(200).json({message: 'Image upload successfully', status: 200})
    })
}

module.exports = { getAllProductsController, getOneProductByIdController, postCreateProductController, deleteProductByIdController, putUpdateProductByIdController, postUploadImgProductController }