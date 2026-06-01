const mensagemDAO = require('../../model/DAO/mensagem.js'); 
const messages = require('../modulo/config_messages.js'); 

const listarTodasMensagens = async function () {
    try {
        let result = await mensagemDAO.getSelectAllMessages();
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

const buscarMensagemPorId = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }
    try {
        let result = await mensagemDAO.getSelectByIdMessage(id);
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

const listarMensagensPorClube = async function (idClube) {
    if (idClube == '' || idClube == undefined || isNaN(idClube)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }
    try {
        let result = await mensagemDAO.getSelectMessagesByIdClub(idClube);
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

const listarRespostasDeMensagem = async function(idMensagemPai) {
    if (idMensagemPai == undefined || idMensagemPai == '' || isNaN(idMensagemPai)) {
        return { status_code: 400, message: "O ID da mensagem pai enviado é inválido ou não foi fornecido." };
    }
    try {
        let dadosRespostas = await mensagemDAO.getRepliesByMessageId(idMensagemPai);
        if (dadosRespostas && Array.isArray(dadosRespostas) && dadosRespostas.length > 0) {
            return { status_code: 200, respostas: dadosRespostas };
        } else {
            return { status_code: 200, respostas: [] };
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno no servidor ao buscar as respostas." };
    }
};

const listarMensagensPrincipaisPorClube = async function (idClube) {
    if (idClube == '' || idClube == undefined || isNaN(idClube)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }
    try {
        let result = await mensagemDAO.getMainMessagesByClubId(idClube);
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

const listarFeedPrincipalGeral = async function () {
    try {
        let result = await mensagemDAO.getAllMainMessagesFeed();
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

const inserirMensagem = async function (dadosMensagem, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        // VALIDAÇÃO: Substituído id_conversa por validação opcional de id_clube
        if (
            dadosMensagem.comentario == '' || dadosMensagem.comentario == undefined || dadosMensagem.comentario.length > 65535 ||
            dadosMensagem.id_usuario == '' || dadosMensagem.id_usuario == undefined || isNaN(dadosMensagem.id_usuario)
        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        // Valida se o id_clube enviado (caso exista) é numérico
        if (dadosMensagem.id_clube !== undefined && dadosMensagem.id_clube !== null && dadosMensagem.id_clube !== '') {
            if (isNaN(dadosMensagem.id_clube)) return messages.ERROR_REQUIRED_FIELDS;
        }

        if (dadosMensagem.id_mensagem_pai !== undefined && dadosMensagem.id_mensagem_pai !== null && dadosMensagem.id_mensagem_pai !== '') {
            if (isNaN(dadosMensagem.id_mensagem_pai)) return messages.ERROR_REQUIRED_FIELDS;
        }

        let result = await mensagemDAO.setInsertMessage(dadosMensagem);

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_CREATED_ITEM.status;
            responseData.status_code = messages.SUCCESS_CREATED_ITEM.status_code;
            responseData.response = messages.SUCCESS_CREATED_ITEM.message;
            return responseData;
        } else {
            return messages.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

const atualizarMensagem = async function (dadosMensagem, contentType, idMensagem) {
    try {
        if (idMensagem == '' || idMensagem == undefined || isNaN(idMensagem)) {
            return messages.ERROR_REQUIRED_FIELDS;
        }
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }
        if (dadosMensagem.comentario == '' || dadosMensagem.comentario == undefined) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        let buscarMensagem = await mensagemDAO.getSelectByIdMessage(idMensagem);
        if (buscarMensagem) {
            dadosMensagem.id_mensagem = idMensagem;
            let result = await mensagemDAO.setUpdateMessages(dadosMensagem);

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
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

const excluirMensagemComRespostas = async function (idMensagem) {
    if (idMensagem == '' || idMensagem == undefined || isNaN(idMensagem)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }
    try {
        let buscarMensagem = await mensagemDAO.getSelectByIdMessage(idMensagem);
        if (buscarMensagem) {
            let result = await mensagemDAO.setDeleteMessageWithReplies(idMensagem);
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

const excluirTodasMensagensDoClube = async function (idClube) {
    if (idClube == '' || idClube == undefined || isNaN(idClube)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }
    try {
        let result = await mensagemDAO.setDeleteAllMessagesByClubId(idClube);
        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_DELETE_ITEM.status;
            responseData.status_code = messages.SUCCESS_DELETE_ITEM.status_code;
            responseData.response = messages.SUCCESS_DELETE_ITEM.message;
            return responseData;
        } else {
            return messages.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

const excluirTodasMensagensDoUsuario = async function (idUsuario) {
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }
    try {
        let result = await mensagemDAO.setDeleteAllMessagesByUserId(idUsuario);
        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_DELETE_ITEM.status;
            responseData.status_code = messages.SUCCESS_DELETE_ITEM.status_code;
            responseData.response = messages.SUCCESS_DELETE_ITEM.message;
            return responseData;
        } else {
            return messages.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

module.exports = {
    listarTodasMensagens,
    buscarMensagemPorId,
    listarMensagensPorClube,
    listarRespostasDeMensagem,
    listarMensagensPrincipaisPorClube,
    listarFeedPrincipalGeral,
    inserirMensagem,
    atualizarMensagem,
    excluirMensagemComRespostas,
    excluirTodasMensagensDoClube,
    excluirTodasMensagensDoUsuario
};