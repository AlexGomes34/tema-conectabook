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
                // Como o DAO retorna um array, pegamos a primeira posição [0]
                const dadosUsuarioBanco = usuario[0];

                // Compara a senha digitada com a senha criptografada do banco
                let senhaMatch = await bcrypt.compare(dadosLogin.senha, dadosUsuarioBanco.senha);

                if (senhaMatch) {
                    let responseData = Object.assign({}, messages.HEADER);
                    responseData.status = messages.SUCCESS_REQUEST.status;
                    responseData.status_code = messages.SUCCESS_REQUEST.status_code;
                    
                    // CORRIGIDO: Alterado de 'id' para 'id_usuario' que é o nome real da coluna no banco
                    const token = jwt.sign(
                        { id: dadosUsuarioBanco.id_usuario, email: dadosUsuarioBanco.email }, 
                        SECRET, 
                        { expiresIn: '24h' }
                    );

                    // RETORNANDO OS DADOS COM O TOKEN JWT EMBUTIDO
                    responseData.user = {
                        id: dadosUsuarioBanco.id_usuario, // Garanta o ID correto aqui
                        nome: dadosUsuarioBanco.nome,
                        nome_usuario: dadosUsuarioBanco.nome_usuario,
                        email: dadosUsuarioBanco.email,
                        data_nascimento: dadosUsuarioBanco.data_nascimento,
                        foto_perfil: dadosUsuarioBanco.foto_perfil,
                        token: token // Não esqueça de devolver o token para o Front-end guardar!
                    };

                    return responseData;
                } else {
                    return messages.ERROR_NOT_FOUND; 
                }
            } else {
                return messages.ERROR_NOT_FOUND;
            }
        }
    } catch (error) {
        console.error("🚨 ERRO CRÍTICO NA CONTROLLER DE AUTH:", error); 
        
        // Retorno preventivo caso a mensagem sumeden do config_messages
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER || { status: false, status_code: 500, message: "Erro interno na controller de autenticação." };
    }
}

module.exports = {
    validarLogin
};