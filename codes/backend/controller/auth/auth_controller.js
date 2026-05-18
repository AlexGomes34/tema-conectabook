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

<<<<<<< HEAD
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
=======
      
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
>>>>>>> 18a1a4781c17f32687e5f437c6b5c59e3cd632fe
            } else {
                return messages.ERROR_INVALID_USER; // Senha incorreta
            }
        } else {
            return messages.ERROR_NOT_FOUND; // E-mail não encontrado
        }
        

    } catch (error) {
<<<<<<< HEAD
        console.error("🚨 ERRO CRÍTICO NA CONTROLLER DE AUTH:", error); 
        
        // Retorno preventivo caso a mensagem sumeden do config_messages
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER || { status: false, status_code: 500, message: "Erro interno na controller de autenticação." };
=======
        console.error(error);
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
>>>>>>> 18a1a4781c17f32687e5f437c6b5c59e3cd632fe
    }
};

module.exports = { 
    validarLogin 
};