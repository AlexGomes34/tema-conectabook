/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação da camada de usuários no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 07/05/2026
 * Autor: Geovanna Silva
 * Autor: Alex Henrique Da Cruz Gomes 
 * Versão: 1.3
 *******************************************************************************************/

const usuarioDAO = require('../../model/DAO/usuario.js')
const bcrypt = require('bcrypt')
const jwtService = require('../../jwt/jwt_service.js')
const messages = require('../modulo/config_messages.js')

const validarLogin = async function(dadosLogin, contentType) {
    try {
       
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (!dadosLogin.email || !dadosLogin.senha) {
            return messages.ERROR_REQUIRED_FIELDS;
        }
      
        let usuario = await usuarioDAO.getSelectUserByEmail(dadosLogin.email);

        if (usuario && usuario.length > 0) {
            
            let senhaMatch = await bcrypt.compare(dadosLogin.senha, usuario[0].senha);

            if (senhaMatch) {
                // Gera o token usando a função getToken 
                // Payload contém ID e Email
                const token = jwtService.getToken({ 
                    id: usuario[0].id_usuario, 
                    email: usuario[0].email 
                });

                // Estrutura da resposta de sucesso 
                let responseData = {
                    status: messages.SUCCESS_REQUEST.status,
                    status_code: messages.SUCCESS_REQUEST.status_code,
                    token: token, 
                    user: {
                        id: usuario[0].id_usuario, 
                        nome: usuario[0].nome,
                        nome_usuario: usuario[0].nome_usuario,
                        email: usuario[0].email,
                        data_nascimento: usuario[0].data_nascimento,
                        foto_perfil: usuario[0].foto_perfil
                    }
                };

                return responseData;
            } else {
                return messages.ERROR_INVALID_USER; // Senha incorreta
            }
        } else {
            return messages.ERROR_NOT_FOUND; // E-mail não encontrado
        }
        

    } catch (error) {
        console.error(error);
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

module.exports = { 
    validarLogin 
};