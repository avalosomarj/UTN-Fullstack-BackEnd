const { pool } = require('../config/db')

const getAllProducts = async () => {
    try{
        const query = 'SELECT * FROM productos'
        const result = (await pool.promise().query(query))[0]

        if(result.length == 0){
            return 404
        }

        return result
    }
    catch(err){
        console.error(err)
    }
}

const getOneProductById = async (pid) => {
    try{
        const query = 'SELECT * FROM productos WHERE id = (?)'
        const result = (await pool.promise().query(query, [pid]))[0]

        if(result.length == 0){
            return 404
        }

        return result[0]
    }
    catch(err){
        console.error(err)
    }
}

const postCreateProduct = async ({nombre, img, precio, stock, descripcion}) => {
    try{
        const query = 'INSERT INTO productos (nombre, img, precio, stock, descripcion) VALUES (?,?,?,?,?)'
        const result = await pool.promise().query(query, [nombre, img, precio, stock, descripcion])

        return result
    }
    catch(err){
        console.error(err)
    }
}

const deleteProductById = async (pid) => {
    try{
        const query = 'DELETE FROM productos WHERE id = (?)'
        const result = await pool.promise().query(query, [pid])

        if(result.affectedRows == 0){
            return 404
        }

        return result
    }
    catch(err){
        console.error(err)
    }
}

const putUpdateProductById = async ({nombre, precio, stock, descripcion, id, img}) => {
    try{
        const query = 'UPDATE productos SET nombre = (?), img = (?), precio = (?), stock = (?), descripcion = (?) WHERE id = (?)'
        const result = (await pool.promise().query(query, [nombre, img, precio, stock, descripcion, id]))[0]

        if(result.affectedRows == 0){
            return 404
        }

        return result
    }
    catch(err){
        console.error(err)
    }
}

module.exports = { getAllProducts, getOneProductById, postCreateProduct, deleteProductById, putUpdateProductById }