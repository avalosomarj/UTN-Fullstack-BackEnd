const { pool } = require('../config/db')
const bcrypt = require('bcrypt')

const postUserLogin = async (username, password) => {
    try{
        const queryGetUserPassDB = 'SELECT password FROM usuarios WHERE username = (?)'
        const hashedPassword = (await pool.promise().query(queryGetUserPassDB, [username]))[0]

        if(hashedPassword.length > 0){
            const isEqualPasswords = await bcrypt.compare(password, hashedPassword[0]['password'])

            if(isEqualPasswords){
                return 200
            }

            return 400
        }
    }
    catch(err){
        console.error(err)
    }
}

const postUserRegister = async (username, password) => {
    try{
        const queryIsUserExist = `SELECT id FROM usuarios WHERE username = (?)`
        const IsUserExist = (await pool.promise().query(queryIsUserExist, [username]))[0]

        if(IsUserExist.length == 0){
            const hashedPassword = await bcrypt.hash(password, 10)
            const query = 'INSERT INTO usuarios (username, password) VALUES (?,?)'
            const result = await pool.promise().query(query, [username, hashedPassword])

            return result
        }

        return 400
    }
    catch(err){
        console.error(err)
    }
}

module.exports = { postUserLogin, postUserRegister }