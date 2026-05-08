/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação da camada de usuários no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 07/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.1
 *******************************************************************************************/
const usuarioDAO = require('../../model/DAO/usuario.js');
const messages = require('../modulo/config_messages.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// Chave secreta para o JWT (Idealmente deve vir de um arquivo .env)
const SECRET = 'conectabook_secret_key_2026';

const validarLogin = async function(dadosLogin, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (dadosLogin.email == '' || dadosLogin.email == undefined || 
            dadosLogin.senha == '' || dadosLogin.senha == undefined) {
            return messages.ERROR_REQUIRED_FIELDS;
        } else {
            let usuario = await usuarioDAO.getSelectUserByEmail(dadosLogin.email);

            if (usuario) {
                let senhaMatch = await bcrypt.compare(dadosLogin.senha, usuario[0].senha);

                if (senhaMatch) {
                    let responseData = Object.assign({}, messages.HEADER);
                    responseData.status = messages.SUCCESS_REQUEST.status;
                    responseData.status_code = messages.SUCCESS_REQUEST.status_code;
                    
                    // GERANDO O TOKEN JWT
                    // Guardamos o ID no payload do token para identificação futura
                    const token = jwt.sign(
                        { id: usuario[0].id, email: usuario[0].email }, 
                        SECRET, 
                        { expiresIn: '24h' }
                    );

                    // RETORNANDO TODOS OS DADOS, INCLUINDO O ID E O TOKEN
                    responseData.user = {
                        id: usuario[0].id_usuario, // Garanta que no banco o nome da coluna seja 'id'
                        nome: usuario[0].nome,
                        nome_usuario: usuario[0].nome_usuario,
                        email: usuario[0].email,
                        data_nascimento: usuario[0].data_nascimento,
                        foto_perfil: usuario[0].foto_perfil
                    };

                    return responseData;
                } else {
                    return messages.ERROR_INVALID_USER;
                }
            } else {
                return messages.ERROR_NOT_FOUND;
            }
        }
    } catch (error) {
        // Log para ajudar você e seu colega a debugar no terminal
        console.log(error); 
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

module.exports = {
    validarLogin
};