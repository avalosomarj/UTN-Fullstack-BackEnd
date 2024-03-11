const { postUserLogin, postUserRegister } = require('../services/userService')
const jwt =  require('jsonwebtoken')

const postUserLoginController = async (req, res) => {
    const {username, password} = req.body

    const result = await postUserLogin(username, password)

    if(!result){
        return res.status(500).json({message: 'Internal server error', status: 500})
    }
    else if(result == 400){
        return res.status(400).json({message: 'Invalid credentials', status: 400})
    }
    else{
        const token = jwt.sign({username}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_TOKEN_VALIDITY_TIME})
        return res.status(200).json({message: 'User login successfully', status: 200, accessToken: token})
    }
}

const postUserRegisterController = async (req, res) => {
    const {username, password} = req.body

    const result = await postUserRegister(username, password)

    if(!result){
        return res.status(500).json({message: 'Internal server error', status: 500})
    }
    else if(result == 400){
        return res.status(400).json({message: 'ERROR: Bad request', status: 400})
    }
    else{
        return res.status(200).json({message: 'User registered successfully', status: 200})
    }
}

const postUserAuthController = async (req, res) => {
    const token = req.header('Authorization')

    try{
        jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
    catch(error){
        //console.error(error)
        return res.status(401).json({error, status: 401})
    }

    return res.status(200).json({message: 'Token is valid', status: 200})
}

module.exports = { postUserLoginController, postUserRegisterController, postUserAuthController }