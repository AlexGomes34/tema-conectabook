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

        // Busca o usuário no banco pelo e-mail
        let dadosUsuario = await usuarioDAO.selectByEmail(dadosLogin.email);

        if (dadosUsuario && dadosUsuario.length > 0) {
            const usuarioBanco = dadosUsuario[0];

            // Compara a senha digitada com a criptografada
            let senhaMatch = await bcrypt.compare(dadosLogin.senha, usuarioBanco.senha);

            if (senhaMatch) {
                // Gera o token usando o serviço externo
                // Passa apenas os dados essenciais para o payload
                const token = jwtService.getToken({ 
                    id: usuarioBanco.id_usuario, 
                    email: usuarioBanco.email 
                });

                //  Monta o objeto de sucesso
                let responseData = Object.assign({}, messages.HEADER);
                responseData.status = messages.SUCCESS_REQUEST.status;
                responseData.status_code = messages.SUCCESS_REQUEST.status_code;
                
                responseData.user = {
                    id: usuarioBanco.id_usuario,
                    nome: usuarioBanco.nome,
                    nome_usuario: usuarioBanco.nome_usuario,
                    email: usuarioBanco.email,
                    foto_perfil: usuarioBanco.foto_perfil,
                    token: token // Token gerado pelo serviço
                };

                return responseData;

            } else {
                return messages.ERROR_INVALID_USER; // Senha incorreta
            }
        } else {
            return messages.ERROR_NOT_FOUND; // E-mail não encontrado
        }

    } catch (error) {
        console.error("ERRO NA AUTH CONTROLLER:", error);
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER || { 
            status: false, 
            status_code: 500, 
            message: "Erro interno no servidor." 
        };
    }
}

module.exports = { 
    validarLogin 
}