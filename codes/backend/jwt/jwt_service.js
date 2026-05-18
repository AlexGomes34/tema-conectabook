/********************************************************************************
 * Objetivo: Arquivo responsável pela criação e uso de json web token  
 * Projeto: Conectabook
 * Data: 18/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.0
 ********************************************************************************/

const jwt = require('jsonwebtoken')
require('dotenv').config()

const getToken = (usuario) => {
    return jwt.sign(usuario, process.env.JWT_SECRET, {expiresIn: '24h'})
}

const getDecodedToken = (token) => {
    return jwt.decode(token)
}

const verificarToken = function(request, response, next) {
    const authHeader = request.headers['authorization']
    if(!authHeader){
        return response.status(401).json({
            message: 'Acesso negado'
        })
    }

    const token = authHeader.split(' ')[1]

    try{
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error){
                return response.status(403).json({
                    message: 'Tokrn inválido'
                })
            }

            request.user = decoded
            next()
        })
    } catch {error} {
        return response.status(500).json({
            message: 'Erro interno'
        })
    }
}

module.exports = {
    getToken,
    getDecodedToken,
    verificarToken
}