/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de usuários (Controller)
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.1
 *******************************************************************************************/

const usuarioDAO = require("../../model/DAO/usuarioDAO.js");
const messages = require("../modulo/config_messages.js");

// GET - Listar todos os usuários
const listarUsuarios = async function() {
    try {
        let result = await usuarioDAO.getSelectAllUsers();
        
        // Agora o result já é o array de usuários ou false
        if (result) {
            let responseData = Object.assign({}, messages.HEADER); 
            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            responseData.response = result; // Atribui direto o array vindo do DAO
            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// GET id - Listar usuário pelo ID
const listarUsuarioID = async function(id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await usuarioDAO.getSelectByIdUser(id);

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            // O DAO já retorna o array de dados filtrado, pegamos a primeira posição
            responseData.response = result[0]; 
            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// POST - Criar novo usuário
const criarUsuario = async function(usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (usuario.nome == '' || usuario.nome == undefined || 
            usuario.nomeUsuario == '' || usuario.nomeUsuario == undefined || 
            usuario.email == '' || usuario.email == undefined || 
            usuario.senha == '' || usuario.senha == undefined ||
            usuario.dataNascimento == '' || usuario.dataNascimento == undefined
        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        } else {
            let result = await usuarioDAO.setInsertUser(usuario);
            
            // O DAO agora retorna true para sucesso na inserção
            if (result) {
                let responseData = Object.assign({}, messages.HEADER);
                responseData.status = messages.SUCCESS_CREATED_ITEM.status;
                responseData.status_code = messages.SUCCESS_CREATED_ITEM.status_code;
                responseData.response = messages.SUCCESS_CREATED_ITEM.message;
                return responseData;
            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL;
            }
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// PUT - Atualizar usuário
const atualizarUsuario = async function(usuario, contentType, id) {
    try {
        if (id == '' || id == undefined || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (usuario.nome == '' || usuario.nome == undefined ||
            usuario.nomeUsuario == '' || usuario.nomeUsuario == undefined ||
            usuario.email == '' || usuario.email == undefined ||
            usuario.senha == '' || usuario.senha == undefined
        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        } else {
            let buscarId = await usuarioDAO.getSelectByIdUser(id);
            
            if (buscarId) {
                usuario.id = id; 
                let result = await usuarioDAO.setUpdateUser(usuario);
                
                if (result) {
                    let responseData = Object.assign({}, messages.HEADER);
                    responseData.status = messages.SUCCESS_UPDATED_ITEM.status;
                    responseData.status_code = messages.SUCCESS_UPDATED_ITEM.status_code;
                    responseData.response = messages.SUCCESS_UPDATED_ITEM.message;
                    return responseData;
                } else {
                    return messages.ERROR_INTERNAL_SERVER_MODEL;
                }
            } else {
                return messages.ERROR_NOT_FOUND;
            }
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// DELETE - Excluir usuário
const excluirUsuario = async function(id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let buscarId = await usuarioDAO.getSelectByIdUser(id);
        
        if (buscarId) {
            let result = await usuarioDAO.setDeleteUser(id);
            
            if (result) {
                let responseData = Object.assign({}, messages.HEADER);
                responseData.status = messages.SUCCESS_DELETE_ITEM.status;
                responseData.status_code = messages.SUCCESS_DELETE_ITEM.status_code;
                responseData.response = messages.SUCCESS_DELETE_ITEM.message;
                return responseData;
            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

module.exports = {
    listarUsuarioID,
    listarUsuarios,
    excluirUsuario,
    atualizarUsuario,
    criarUsuario,
};