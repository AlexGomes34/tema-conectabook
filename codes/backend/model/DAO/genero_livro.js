/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de livros e gêneros (tabela de relação)
 * Projeto: ConectaBook
 * Data: 15/05/2026
 * Autor: Geovanna Silva / Alex Henrique
 * Versão: 1.2
 *******************************************************************************************/

// CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection');

// RETORNA TODOS OS REGISTROS DA TABELA RELACIONAMENTO DE LIVROS E GÊNEROS
const getSelectAllGenresBooks = async function () {
    try {
        let sql = `select * from tbl_genero_livro order by id_genero_livro asc`
        
        // CORRIGIDO: de db.rank para db.raw
        let result = await db.raw(sql)

        // CORRIGIDO: Retornava false no sucesso, agora retorna os dados corretos
        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch(error) {
        return false
    }
}

// RETORNA O RELACIONAMENTO PELO ID DA TABELA INTERMEDIÁRIA
const getSelectByIdGenresBooks = async function (id) {
    try {
        // CORRIGIDO: Segurança com parâmetro '?'
        let sql = `select * from tbl_genero_livro where id_genero_livro = ?`
        let result = await db.raw(sql, [id])

        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch(error) {
        return false
    }
}

// RETORNA OS GÊNEROS DE UM LIVRO ESPECÍFICO
const getSelectGenresByIdBooks = async function (idLivro) {
    try {
        // CORRIGIDO: Trocado tbl_genero_usuario para tbl_genero_livro no JOIN e adicionado '?'
        let sql = `select
                    tbl_genero.id_genero,
                    tbl_genero.nome
                   from tbl_livro
                        join tbl_genero_livro on tbl_livro.id_livro = tbl_genero_livro.id_livro
                        join tbl_genero on tbl_genero.id_genero = tbl_genero_livro.id_genero
                   where tbl_livro.id_livro = ?;`

        let result = await db.raw(sql, [idLivro])

        if (result && result[0].length > 0)
            return result[0]
        else  
            return false
    } catch(error) {
        return false
    }
}

// RETORNA OS LIVROS QUE POSSUEM UM GÊNERO ESPECÍFICO
const getSelectBooksByIdGenres = async function (idGenero) {
    try {
        // CORRIGIDO: Adicionado '?' por segurança
        let sql = `select
                    tbl_livro.id_livro,
                    tbl_livro.capa,
                    tbl_livro.titulo
                   from tbl_genero
                        join tbl_genero_livro on tbl_genero.id_genero = tbl_genero_livro.id_genero
                        join tbl_livro on tbl_livro.id_livro = tbl_genero_livro.id_livro
                   where tbl_genero.id_genero = ?;`
        
        let result = await db.raw(sql, [idGenero])

        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch(error) {
        return false
    }
}

// INSERE UM NOVO RELACIONAMENTO
const setInsertGenresBooks = async function (generoLivro) {
    try {
        let sql = `insert into tbl_genero_livro(
                        id_genero,
                        id_livro
                   ) values (
                        ${generoLivro.id_genero},
                        ${generoLivro.id_livro}
                   )`

        let result = await db.raw(sql)

        // CORRIGIDO: Para inserts/updates usamos affectedRows em vez de .length no MySQL
        if (result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch(error) {
        return false
    }
}

// INSERE VÁRIOS RELACIONAMENTOS DE UMA VEZ
const setInsertMultiplesGenresBooks = async function (dados) {
    try {
        const valores = dados.generos.map(id_genero =>
            `(${id_genero}, ${dados.id_livro})`
        ).join(',')

        let sql = `insert into tbl_genero_livro (id_genero, id_livro) values ${valores}`

        let result = await db.raw(sql)
        return !!(result && result[0].affectedRows > 0)
    } catch (error) {
        return false
    }
}

// ATUALIZA UM RELACIONAMENTO
const setUpdateGenresBooks = async function (generoLivro) {
    try {
        let sql = `update tbl_genero_livro set
                        id_genero = ${generoLivro.id_genero},
                        id_livro = ${generoLivro.id_livro}
                    where id_genero_livro = ${generoLivro.id_genero_livro}`

        let result = await db.raw(sql)

        if (result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch(error) {
        return false
    }
}

// DELETA UM RELACIONAMENTO PELO ID DA INTERMEDIÁRIA
const setDeleteGenresBooks = async function (id) {
    try {
        let sql = `delete from tbl_genero_livro where id_genero_livro = ?`
        let result = await db.raw(sql, [id])

        // Trata o array extraindo o cabeçalho do resultado do MySQL
        if (result && result[0]) {
            const header = result[0];
            
            // Verifica se a propriedade affectedRows existe e é maior que 0
            if (header.affectedRows > 0) {
                return true;
            }
        }
        
        return false;

    } catch(error) {
        return false;
    }
}

// DELETA OS RELACIONAMENTOS DE UM LIVRO
const setDeleteGenresByIdBook = async function (id) {
    try {
        let sql = `delete from tbl_genero_livro where id_livro = ?`
        let result = await db.raw(sql, [id])

        if (result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch(error) {
        return false
    }
}

module.exports = {
    getSelectAllGenresBooks,
    getSelectGenresByIdBooks,
    getSelectBooksByIdGenres,
    getSelectByIdGenresBooks,
    setInsertGenresBooks,
    setInsertMultiplesGenresBooks,
    setUpdateGenresBooks,
    setDeleteGenresBooks,
    setDeleteGenresByIdBook
}