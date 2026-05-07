/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação da camada de usuários no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 07/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.0
 *******************************************************************************************/
const usuarioDAO = require('../../model/DAO/usuario.js');
const messages = require('../modulo/config_messages.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

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
                    
                    // RETORNANDO TODOS OS DADOS DO USUÁRIO
                    // Note: A senha nunca é retornada, pois é um hash e não pode ser lida.
                    responseData.user = {
                        id: usuario[0].id,
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
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

module.exports = {
    validarLogin
};