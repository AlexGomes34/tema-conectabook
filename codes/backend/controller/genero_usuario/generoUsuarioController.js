/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de genero usuarios (Controller)
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.1
 *******************************************************************************************/

const generoUsuarioDAO = require("../../model/DAO/genero_usuario.js");
const messages = require("../modulo/config_messages.js");

// GET - Listar todos os genêros de usuário
const listarGenerosUsuario = async function() {
    try {
        let result = await generoUsuarioDAO.getSelectAllGenresUsers();

        //
        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            responseData.response = result;
            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

//GET id - Listar genero usuario pelo ID
const listarGeneroUsuarioID = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await generoUsuarioDAO.getSelectUsersByIdGenres(id);

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;

            responseData.response = result [0];
            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// POST - Criar novo genero de usuário
const criarGeneroUsuario = async function (id_genero, id_usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (id_genero == '' || id_genero == undefined ||
            id_usuario == ''|| id_usuario == undefined
        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        } else {
            let result = await generoUsuarioDAO.setInsertGenresUsers(genero_usuario);

            // Retorno do DAO para o sucesso da inserção
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

// PUT - Atualizar genero de usuário
const atualizarGeneroUsuario = async function (genero_usuario, contentType, id) {
    try {
        if (id == ''|| id == undefined || isNaN(id)){
            return messages.ERROR_REQUIRED_FIELDS;
        }

        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (id_genero == ''|| id_genero == undefined ||
            id_usuario == ''|| id_usuario == undefined

        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        } else {
            let buscarId = await generoUsuarioDAO.getSelectByIdGenresUsers(id);

            if (buscarId) {
                id_genero_usuario.id = id;
                let result = await generoUsuarioDAO.setUpdateGenresUsers(id_genero_usuario);

                if (result) {
                    let responseData = Object.assign({}, messages.HEADER);
                    response.status = messages.SUCCESS_UPDATED_ITEM.status;
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

//DELETE - Excluir Genero usuario
const excluirGeneroUsuario = async function (id_genero_usuario) {
    if (id_genero_usuario == ''|| id_genero_usuario == undefined || isNaN(id_genero_usuario)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let buscarGeneroUsuarioId = await generoUsuarioDAO.getSelectByIdGenresUsers(id_genero_usuario);

        if (buscarGeneroUsuarioId) {
            let result = await generoUsuarioDAO.setDeleteGenresUsers(id_genero_usuario);
        
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
    listarGeneroUsuarioID,
    listarGenerosUsuario,
    excluirGeneroUsuario,
    atualizarGeneroUsuario,
    criarGeneroUsuario
};