/*******************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios e controle das rotas da Estante
 * Projeto: ConectaBook
 * Data: 29/05/2026
 * Autor: Alex Henrique Da Cruz Gomes 
 * Versão: 1.0
 *******************************************************************************************/

const estanteDAO = require('../../model/DAO/estante.js'); // Ajuste o caminho se necessário

// Lista os livros que o usuário já LEU
const listarLivrosLidos = async function (idUsuario) {
    if (idUsuario == undefined || idUsuario == '' || isNaN(idUsuario)) {
        return { status_code: 400, message: "O ID do usuário enviado é inválido ou não foi fornecido." };
    }

    try {
        let dados = await estanteDAO.getSelectBookcaseByStatus(idUsuario, 'Lidos');
        return { 
            status_code: 200, 
            livros: dados && dados.length > 0 ? dados : [] 
        };
    } catch (error) {
        console.error("Erro na controller (Lidos):", error);
        return { status_code: 500, message: "Erro interno ao buscar livros lidos." };
    }
};

// Lista os livros que o usuário está LENDO atualmente
const listarLivrosLendo = async function (idUsuario) {
    if (idUsuario == undefined || idUsuario == '' || isNaN(idUsuario)) {
        return { status_code: 400, message: "O ID do usuário enviado é inválido ou não foi fornecido." };
    }

    try {
        let dados = await estanteDAO.getSelectBookcaseByStatus(idUsuario, 'Lendo');
        return { 
            status_code: 200, 
            livros: dados && dados.length > 0 ? dados : [] 
        };
    } catch (error) {
        console.error("Erro na controller (Lendo):", error);
        return { status_code: 500, message: "Erro interno ao buscar livros que está lendo." };
    }
};

// Lista os livros que o usuário QUER LER
const listarLivrosQueroLer = async function (idUsuario) {
    if (idUsuario == undefined || idUsuario == '' || isNaN(idUsuario)) {
        return { status_code: 400, message: "O ID do usuário enviado é inválido ou não foi fornecido." };
    }

    try {
        let dados = await estanteDAO.getSelectBookcaseByStatus(idUsuario, 'Quero Ler');
        return { 
            status_code: 200, 
            livros: dados && dados.length > 0 ? dados : [] 
        };
    } catch (error) {
        console.error("Erro na controller (Quero Ler):", error);
        return { status_code: 500, message: "Erro interno ao buscar livros desejados." };
    }
};


// =========================================================================
// CRUD TRADICIONAL DA ESTANTE
// =========================================================================

// Retorna todas as estantes do banco de dados
const listarTodasEstantes = async function () {
    try {
        let dados = await estanteDAO.getSelectAllBookcase();
        if (dados && dados.length > 0) {
            return { status_code: 200, estantes: dados };
        } else {
            return { status_code: 200, estantes: [] };
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno no servidor ao listar as estantes." };
    }
};

// Busca um item da estante por ID único da tabela
const buscarEstantePorId = async function (id) {
    if (id == undefined || id == '' || isNaN(id)) {
        return { status_code: 400, message: "O ID enviado é inválido ou vazio." };
    }

    try {
        let dados = await estanteDAO.getSelectByIdBookcase(id);
        if (dados && dados.length > 0) {
            return { status_code: 200, estante: dados[0] };
        } else {
            return { status_code: 404, message: "Item da estante não encontrado." };
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno no servidor ao buscar o registro." };
    }
};

// Retorna toda a estante de um usuário específico (sem filtrar status)
const listarEstantePorUsuario = async function (idUsuario) {
    if (idUsuario == undefined || idUsuario == '' || isNaN(idUsuario)) {
        return { status_code: 400, message: "O ID do usuário enviado é inválido ou vazio." };
    }

    try {
        let dados = await estanteDAO.getSelectBookcaseByIdUser(idUsuario);
        return { 
            status_code: 200, 
            estante: dados && dados.length > 0 ? dados : [] 
        };
    } catch (error) {
        return { status_code: 500, message: "Erro interno no servidor ao buscar a estante do usuário." };
    }
};

// Insere um novo livro na estante
const criarItemEstante = async function (dadosCorpo, contentType) {
    if (String(contentType).toLowerCase() !== 'application/json') {
        return { status_code: 415, message: "Tipo de mídia não suportado. Use application/json" };
    }

    // Validação básica de campos obrigatórios
    if (!dadosCorpo.id_usuario || !dadosCorpo.id_status_livro || !dadosCorpo.id_livro) {
        return { status_code: 400, message: "Campos obrigatórios ausentes (id_usuario, id_status_livro, id_livro)." };
    }

    try {
        let result = await estanteDAO.setInsertBookcase(dadosCorpo);
        if (result) {
            return { status_code: 201, message: "Livro adicionado à estante com sucesso!" };
        } else {
            return { status_code: 400, message: "Não foi possível inserir o livro na estante. Verifique os dados." };
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno no servidor ao salvar item na estante." };
    }
};

// Atualiza o status ou dados de um item da estante
const atualizarItemEstante = async function (dadosCorpo, contentType, idEstante) {
    if (String(contentType).toLowerCase() !== 'application/json') {
        return { status_code: 415, message: "Tipo de mídia não suportado. Use application/json" };
    }

    if (idEstante == undefined || idEstante == '' || isNaN(idEstante)) {
        return { status_code: 400, message: "O ID para atualização é inválido ou vazio." };
    }

    // Injeta o ID da estante dentro do objeto antes de enviar pro DAO
    dadosCorpo.id_estante = idEstante;

    try {
        let result = await estanteDAO.setUpdateBookcase(dadosCorpo);
        if (result) {
            return { status_code: 200, message: "Estante atualizada com sucesso!" };
        } else {
            return { status_code: 404, message: "Não foi possível atualizar. Registro não encontrado." };
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno no servidor ao atualizar a estante." };
    }
};

// Exclui um livro da estante pelo ID do registro
const excluirItemEstante = async function (id) {
    if (id == undefined || id == '' || isNaN(id)) {
        return { status_code: 400, message: "O ID enviado para exclusão é inválido." };
    }

    try {
        let result = await estanteDAO.setDeleteBookcase(id);
        if (result) {
            return { status_code: 200, message: "Livro removido da estante com sucesso!" };
        } else {
            return { status_code: 404, message: "Registro não encontrado para exclusão." };
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno no servidor ao deletar item da estante." };
    }
};

// Limpa toda a estante de um usuário (Ex: Se o usuário deletar a conta)
const excluirEstantePorUsuario = async function (idUsuario) {
    if (idUsuario == undefined || idUsuario == '' || isNaN(idUsuario)) {
        return { status_code: 400, message: "O ID do usuário para exclusão é inválido." };
    }

    try {
        let result = await estanteDAO.setDeleteBookcaseByUserId(idUsuario);
        if (result) {
            return { status_code: 200, message: "Todos os livros da estante do usuário foram removidos." };
        } else {
            return { status_code: 404, message: "Nenhum registro encontrado para esse usuário." };
        }
    } catch (error) {
        return { status_code: 500, message: "Erro interno no servidor ao limpar estante do usuário." };
    }
};

module.exports = {
    listarLivrosLidos,
    listarLivrosLendo,
    listarLivrosQueroLer,
    listarTodasEstantes,
    buscarEstantePorId,
    listarEstantePorUsuario,
    criarItemEstante,
    atualizarItemEstante,
    excluirItemEstante,
    excluirEstantePorUsuario
};