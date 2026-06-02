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

const listarRespostasDeMensagem = async function (idMensagemPai) {
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
        // 1. CORRIGIDO: Agora aceita multipart/form-data em vez de travar apenas em application/json
        if (String(contentType).toLowerCase().includes('multipart/form-data') === false) {
            return messages.ERROR_CONTENT_TYPE;
        }

        // VALIDAÇÃO: Campos estritamente obrigatórios
        if (
            dadosMensagem.comentario == '' || dadosMensagem.comentario == undefined || dadosMensagem.comentario.length > 65535 ||
            dadosMensagem.id_usuario == '' || dadosMensagem.id_usuario == undefined || isNaN(dadosMensagem.id_usuario)
        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        // 2. CORRIGIDO: Limpa chaves vazias vindas do form-data para não quebrar no isNaN()
        if (dadosMensagem.id_clube === '' || dadosMensagem.id_clube === 'null') dadosMensagem.id_clube = undefined;
        if (dadosMensagem.id_mensagem_pai === '' || dadosMensagem.id_mensagem_pai === 'null') dadosMensagem.id_mensagem_pai = undefined;

        // Valida se o id_clube enviado (caso exista) é numérico
        if (dadosMensagem.id_clube !== undefined && dadosMensagem.id_clube !== null) {
            if (isNaN(dadosMensagem.id_clube)) return messages.ERROR_REQUIRED_FIELDS;
        }

        if (dadosMensagem.id_mensagem_pai !== undefined && dadosMensagem.id_mensagem_pai !== null) {
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
        console.error("🚨 Erro na Controller de Mensagem:", error); // Adicionado log para te ajudar no terminal
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

const atualizarMensagem = async function (dadosMensagem, contentType, idMensagem) {
    try {
        // 1. Validação do ID da URL
        if (idMensagem == '' || idMensagem == undefined || isNaN(idMensagem)) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        // 2. CORRIGIDO: Agora aceita multipart/form-data para permitir arquivos
        if (String(contentType).toLowerCase().includes('multipart/form-data') === false) {
            return messages.ERROR_CONTENT_TYPE;
        }

        // 3. Validação dos campos obrigatórios de texto
        if (dadosMensagem.comentario == '' || dadosMensagem.comentario == undefined) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        // 4. Verifica se a mensagem de fato existe no banco antes de atualizar
        let buscarMensagem = await mensagemDAO.getSelectByIdMessage(idMensagem);

        if (buscarMensagem) {
            dadosMensagem.id_mensagem = idMensagem;

            // Tratamento estratégico para o arquivo:
            // Se dadosMensagem.arquivo for undefined, significa que o usuário NÃO mandou um novo arquivo no Postman.
            // Para não apagar o arquivo antigo que já estava no banco, recuperamos o nome dele:
            if (dadosMensagem.arquivo === undefined && buscarMensagem[0] && buscarMensagem[0].arquivo) {
                dadosMensagem.arquivo = buscarMensagem[0].arquivo;
            }

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
        console.error("🚨 Erro na Controller de Mensagem (PUT):", error);
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