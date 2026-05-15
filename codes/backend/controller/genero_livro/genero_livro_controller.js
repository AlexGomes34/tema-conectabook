/*******************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do relacionamento entre Livros e Gêneros
 * Projeto: ConectaBook
 * Data: 15/05/2026
 * Autor: Alex Henrique / Geovanna Silva
 * Versão: 1.0
 *******************************************************************************************/

const generoLivroDAO = require('../../model/DAO/genero_livro.js'); // Ajuste o caminho se necessário
const messages = require('../modulo/config_messages.js'); // Ajuste o caminho do seu arquivo de mensagens

// GET - Listar todos os relacionamentos
const listarTodosGenerosLivros = async function () {
    try {
        let result = await generoLivroDAO.getSelectAllGenresBooks();

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

// GET - Buscar pelo ID da tabela intermediária
const buscarGeneroLivroPorId = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await generoLivroDAO.getSelectByIdGenresBooks(id);

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            responseData.response = result[0]; // Retorna apenas o objeto encontrado
            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// GET - Listar gêneros de um livro específico
const listarGenerosDeUmLivro = async function (idLivro) {
    if (idLivro == '' || idLivro == undefined || isNaN(idLivro)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await generoLivroDAO.getSelectGenresByIdBooks(idLivro);

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

// GET - Listar livros de um gênero específico
const listarLivrosDeUmGenero = async function (idGenero) {
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await generoLivroDAO.getSelectBooksByIdGenres(idGenero);

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

// POST - Inserir um único relacionamento
const inserirGeneroLivro = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (dados.id_genero == '' || dados.id_genero == undefined || isNaN(dados.id_genero) ||
            dados.id_livro == '' || dados.id_livro == undefined || isNaN(dados.id_livro)) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        let result = await generoLivroDAO.setInsertGenresBooks(dados);

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

// POST - Inserir múltiplos gêneros para um livro (Ideal para quando cadastra o livro)
const inserirMultiplosGenerosLivro = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (dados.id_livro == '' || dados.id_livro == undefined || isNaN(dados.id_livro) ||
            !dados.generos || !Array.isArray(dados.generos) || dados.generos.length === 0) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        let result = await generoLivroDAO.setInsertMultiplesGenresBooks(dados);

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

// PUT - Atualizar relacionamento existente
const atualizarGeneroLivro = async function (dados, contentType, id) {
    try {
        if (id == '' || id == undefined || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (dados.id_genero == '' || dados.id_genero == undefined || isNaN(dados.id_genero) ||
            dados.id_livro == '' || dados.id_livro == undefined || isNaN(dados.id_livro)) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        let buscarId = await generoLivroDAO.getSelectByIdGenresBooks(id);

        if (buscarId) {
            dados.id_genero_livro = id; // Injeta o ID da URL no objeto de dados
            let result = await generoLivroDAO.setUpdateGenresBooks(dados);

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

// DELETE - Excluir um relacionamento único pelo ID da tabela intermediária
const excluirGeneroLivro = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let buscarId = await generoLivroDAO.getSelectByIdGenresBooks(id);

        if (buscarId) {
            let result = await generoLivroDAO.setDeleteGenresBooks(id); // Passando ID direto

            if (result) {
                let responseData = Object.assign({}, messages.HEADER);
                responseData.status = messages.SUCCESS_DELETED_ITEM.status;
                responseData.status_code = messages.SUCCESS_DELETED_ITEM.status_code;
                responseData.response = messages.SUCCESS_DELETED_ITEM.message;
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


const excluirGenerosPorLivro = async function (idGenero) {
    // Validação do ID do usuário
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return messages.ERROR_INVALID_ID; 
    }

    try {
        // Chamada para o DAO (usando a função setDeleteGenresByIdUser que você criou)
        let result = await generoLivroDAO.setDeleteGenresByIdBook(idGenero);

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_DELETE_ITEM.status;
            responseData.status_code = messages.SUCCESS_DELETE_ITEM.status_code;
            responseData.response = messages.SUCCESS_DELETE_ITEM.message;
            return responseData;
        } else {
            // Se retornar false, pode ser que o usuário não tivesse gêneros ou o ID não existe
            return messages.ERROR_NOT_FOUND; 
        }
    } catch (error) {
        console.log(error);
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

module.exports = {
    listarTodosGenerosLivros,
    buscarGeneroLivroPorId,
    listarGenerosDeUmLivro,
    listarLivrosDeUmGenero,
    inserirGeneroLivro,
    inserirMultiplosGenerosLivro,
    atualizarGeneroLivro,
    excluirGeneroLivro,
    excluirGenerosPorLivro
};