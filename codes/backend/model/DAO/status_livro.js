/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de status livro no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 26/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.0
 *******************************************************************************************/

// CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection');

// RETORNA TODOS OS STATUS_LIVRO DO BANCO
const getSelectAllStatusBook = async function () {
    try {
        let sql = `select * from tbl_status_livro order by id_status_livro asc`
        let result = await db.raw(sql)

        // Retorna apenas a lista de dados (índice 0)
        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

// RETORNA STATUS_LIVRO PELO ID
const getSelectByIdStatusBook = async function (id) {
    try {
        let sql = `select * from tbl_status_livro where id_status_livro = ${id}`
        let result = await db.raw(sql)

        // Retorna o primeiro registro do índice 0
        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

// INSERE UM STATUS_LIVRO
const setInsertStatusBook = async function (statusLivro) {
    try {
        let sql = `insert into tbl_status_livro (
                        nome_status
                    ) values (
                        '${statusLivro.nome_status}'
                    )`
        
        let result = await db.raw(sql);

        if (result && result[0].affectedRows > 0)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}


// ATUALIZA UM STATUS_LIVRO
const setUpdateStatusBook = async function (statusLivro) {
    try {
        let sql = `update tbl_status_livro set 
                        nome_status = '${statusLivro.nome_status}',
                    where id_status = ${statusLivro.id}`
        
        let result = await db.raw(sql)

        if (result && result[0].affectedRows > 0)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

// DELETA UM STATUS_LIVRO NO BANCO
const setDeleteStatusBook = async function (id) {
    try {
        let sql = `delete from tbl_status_livro where id_status_livro = ${id}`
        let result = await db.raw(sql)

        if (result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllStatusBook,
    getSelectByIdStatusBook,
    setInsertStatusBook,
    setUpdateStatusBook,
    setDeleteStatusBook
}