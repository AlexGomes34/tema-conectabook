/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de livros no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1 
 *******************************************************************************************/

// CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection');

// RETORNA TODOS OS LIVROS DO BANCO
const getSelectAllBooks = async function () {
    try {
        let sql = `select * from tbl_livro order by id_livro asc`
        let result = await db.raw(sql)

        //Retorna apenas a lista de dados (índice 0)
        if (result && result[0].length  > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}


// RETORNA LIVRO PELO ID
const getSelectByIdBook = async function (id) {
    try {
        let sql = `select * from tbl_livro where id_livro = ${id}`
        let result = await db.raw(sql)

        //Retorna o primeiro registro do índice 0
        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
    
}


// INSERE UM LIVRO NO BANCO
const setInsertBook = async function (livro) {
    try {
        let sql = `insert into tbl_livro (
                        isbn,
                        titulo, 
                        autor, 
                        descricao,
                        capa
                    ) values (
                        '${livro.isbn}',
                        '${livro.titulo}',
                        '${livro.autor}', 
                        '${livro.descricao}',
                        '${livro.capa}'
                  )`

        let result = await db.raw(sql)

        // Verifica se a linha foi afetada no índice 0
        if (result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// ATUALIZA UM LIVRO NO BANCO 
const setUpdateBook = async function (livro) {
    try {
        let sql = `update tbl_livro set 
                        isbn = '${livro.isbn}',
                        titulo = '${livro.titulo}',
                        autor = '${livro.autor}', 
                        descricao = '${livro.descricao}',
                        capa = '${livro.capa}'
                    where id_livro = ${livro.id}`

        let result = await db.raw(sql)
        
        if (result && result[0]) {
            const header = result[0];
            if (header.affectedRows > 0) {
                return true;
            }
        }
        return false;

    } catch (error) {
        console.log("Erro ao atualizar livro no banco:", error);
        return false;
    }
}


const setDeleteBook = async function (id) {
    try {
        let sql = `delete from tbl_livro where id_livro = ${id}`
        let result = await db.raw(sql)

        if (result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}


module.exports =  {
    getSelectAllBooks,
    getSelectByIdBook,
    setInsertBook,
    setUpdateBook,
    setDeleteBook
}