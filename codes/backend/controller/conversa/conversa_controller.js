/*******************************************************************************************
 * Objetivo: Controller responsável pelas regras de negócio e manipulação de Conversas
 * Projeto: ConectaBook
 * Data: 19/05/2026
 * Autor: Alex Gomes
 * Versão: 1.0
 *******************************************************************************************/

const conversaDAO = require('../../model/DAO/conversa.js');
const messages = require('../modulo/config_messages.js'); 

// GET - Listar todas as conversas existentes
const listarTodasConversas = async function () {
    try {
        let result = await conversaDAO.getSelectAllConversations();

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

// GET - Buscar uma conversa específica pelo ID
const buscarConversaPorId = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await conversaDAO.getSelectByIdConversation(id);

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

// GET - Buscar conversa atrelada a um clube específico
const buscarConversaPorClube = async function (idClube) {
    if (idClube == '' || idClube == undefined || isNaN(idClube)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await conversaDAO.getConversationByClubId(idClube);

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

// POST - Criar uma nova conversa (Retorna o ID gerado no corpo da resposta bem-sucedida)
const inserirConversa = async function (dadosConversa, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        // Validação: id_clube é opcional (pode ser null se for do feed principal geral)
        if (dadosConversa.id_clube !== undefined && dadosConversa.id_clube !== null && dadosConversa.id_clube !== '') {
            if (isNaN(dadosConversa.id_clube)) return messages.ERROR_REQUIRED_FIELDS;
        }

        let resultId = await conversaDAO.setInsertConversation(dadosConversa);

        if (resultId) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_CREATED_ITEM.status;
            responseData.status_code = messages.SUCCESS_CREATED_ITEM.status_code;
            // Injeta o ID criado na resposta para que o Front ou outra rota usem imediatamente
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

// DELETE - Apagar um registro de conversa
const excluirConversa = async function (idConversa) {
    if (idConversa == '' || idConversa == undefined || isNaN(idConversa)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let buscarConversa = await conversaDAO.getSelectByIdConversation(idConversa);

        if (buscarConversa) {
            let result = await conversaDAO.setDeleteConversation(idConversa);

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
    listarTodasConversas,
    buscarConversaPorId,
    buscarConversaPorClube,
    inserirConversa,
    excluirConversa
}