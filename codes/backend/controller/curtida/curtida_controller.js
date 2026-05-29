/*******************************************************************************************
 * Objetivo: Controller responsável pelas regras de negócio e manipulação de Curtidas
 * Projeto: ConectaBook
 * Data: 26/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.0
 *******************************************************************************************/

const curtidaDAO = require('../../model/DAO/curtida')
const messages = require('../modulo/config_messages')


// GET - Listar todas as curtidas existentes
const listarTodasCurtidas = async function () {
    try {
        let result = await curtidaDAO.getSelectAllLikes()

        if (result) {
            let responseData = Object.assign({}, messages.HEADER)
            responseData.status = messages.SUCCESS_REQUEST.status
            responseData.status_code = messages.SUCCESS_REQUEST.status_code
            responseData.response = result
            return responseData
        } else {
            return messages.ERROR_NOT_FOUND
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


// GET - Buscar uma curtida específica pelo ID
const buscarCurtidaPorId = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS
    }

    try {
        let result = await curtidaDAO.getSelectByIdLike(id)

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            responseData.response = result[0];
            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// GET - Buscar curtida pelo id do usuário
const buscarCurtidaPorIdUsuario = async function (idUsuario) {

    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return messages.ERROR_REQUIRED_FIELDS
    }

    try {
        let result = await curtidaDAO.getSelectLikeByIdUser(idUsuario)

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


// POST - criar curtida (Retorna o ID gerado no corpo da resposta de sucesso)
const inserirCurtida = async function (curtida, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE
        }

        let resultId = await curtidaDAO.setInsertLike(curtida)

        if (resultId) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_CREATED_ITEM.status;
            responseData.status_code = messages.SUCCESS_CREATED_ITEM.status_code;
            responseData.response = {
                message: messages.SUCCESS_CREATED_ITEM.message,
                insert_id: resultId
            };
            return responseData;
        } else {
            return messages.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


// DELETE  - Apagar uma curtida 
const excluirCurtida = async function (idCurtida) {
    if (idCurtida == '' || idCurtida == undefined || isNaN(idCurtida)) {
        return messages.ERROR_REQUIRED_FIELDS
    }

    try {
        let buscarCurtida = await curtidaDAO.getSelectByIdLike(idCurtida)

        if (buscarCurtida) {
            let result = await curtidaDAO.setDeleteLike(idCurtida)

            if (result) {
                let responseData = Object.assign({}, messages.HEADER)
                responseData.status = messages.SUCCESS_DELETE_ITEM.status
                responseData.status_code = messages.SUCCESS_DELETE_ITEM.status_code
                responseData.response = messages.SUCCESS_DELETE_ITEM.message
                return responseData
            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return messages.ERROR_NOT_FOUND
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarTodasCurtidas,
    buscarCurtidaPorId,
    buscarCurtidaPorIdUsuario,
    inserirCurtida,
    excluirCurtida
}