/*******************************************************************************************
 * Objetivo: Controller responsável pelas regras de negócio e manipulação de Mensagens/Posts
 * Projeto: ConectaBook
 * Data: 18/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.0
 *******************************************************************************************/

const mensagemDAO = require('../../model/DAO/mensagem.js'); // Ajuste o caminho se necessário
const messages = require('../modulo/config_messages.js'); 
const {getIo} = require('../../socket/socketServer.js')

// GET - Listar absolutamente todas as mensagens (Histórico bruto do Banco)
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

// GET - Buscar uma mensagem específica pelo ID
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
            responseData.response = result[0]; // Retorna o objeto direto mapeado
            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// GET - Listar todas as mensagens de um clube (Cronológico)
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

// GET - Listar respostas (threads) de um comentário/post pai
const listarRespostasDeMensagem = async function(idMensagemPai) {
    // 1. Validação do ID
    if (idMensagemPai == undefined || idMensagemPai == '' || isNaN(idMensagemPai)) {
        return {
            status_code: 400,
            message: "O ID da mensagem pai enviado é inválido ou não foi fornecido."
        };
    }

    try {
        // 2. Executa a busca no Banco de Dados
        let dadosRespostas = await mensagemDAO.getRepliesByMessageId(idMensagemPai); // Verifique se o nome do seu DAO/função está correto aqui

        // 3. Validação segura: se for um array válido e tiver itens, retorna os itens.
        // Se vier false, null, undefined ou array vazio, retorna o array vazio com status 200.
        if (dadosRespostas && Array.isArray(dadosRespostas) && dadosRespostas.length > 0) {
            return {
                status_code: 200,
                respostas: dadosRespostas
            };
        } else {
            return {
                status_code: 200,
                respostas: [] // Retorna vazio sem estourar 404 ou 500 no front
            };
        }

    } catch (error) {
        // Exibe no terminal do VS Code o erro exato que fez o código travar
        console.log("Erro na Controller de Mensagens:", error);
        
        return {
            status_code: 500,
            message: "Erro interno no servidor ao buscar as respostas."
        };
    }
};

// GET - Listar apenas os posts principais de um clube específico (Feed Limpo do Clube)
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

// GET - Listar posts principais do Feed Geral da Plataforma (Timeline do usuário)
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

// POST - Postar nova mensagem ou resposta no fórum
const inserirMensagem = async function (dadosMensagem, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        // Validação de campos obrigatórios conforme as FKs do modelo de dados
        if (
            dadosMensagem.comentario == '' || dadosMensagem.comentario == undefined || dadosMensagem.comentario.length > 65535 ||
            dadosMensagem.id_usuario == '' || dadosMensagem.id_usuario == undefined || isNaN(dadosMensagem.id_usuario) ||
            dadosMensagem.id_conversa == '' || dadosMensagem.id_conversa == undefined || isNaN(dadosMensagem.id_conversa)
        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        // Tratamento explícito para id_mensagem_pai (pode ser null caso não seja uma resposta)
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

// PUT - Atualizar o conteúdo ou anexo de uma postagem existente
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

        // Verifica se a mensagem de fato existe antes de rodar o update
        let buscarMensagem = await mensagemDAO.getSelectByIdMessage(idMensagem);

        if (buscarMensagem) {
            dadosMensagem.id_mensagem = idMensagem; // Injeta o id capturado pela rota URL
            
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

// DELETE - Deletar uma mensagem específica com todas as suas respostas e curtidas atreladas
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

// DELETE - Limpar histórico completo de mensagens de um determinado Clube
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

// DELETE - Limpar histórico de posts de um usuário (Banned ou Exclusão voluntária)
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