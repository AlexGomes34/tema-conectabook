/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de livros e gêneros (tabela de relação)
 * Projeto: ConectaBook
 * Data: 11/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1 
 *******************************************************************************************/


// CONEXÃO COM O BANCO DE DADOS
 const db = require('../../database/connection');

 //RETORNA TODOS OS REGISTROS DA TABELA RELACIONAMENTO DE LIVROS E GÊNEROS
 const getSelectAllGenresBooks = async function () {
    try{
        let sql = `select * from tbl_genero_livro order by id_genero_livro asc`
        let result = await db.rank(sql)

        // retorna a lista de dados
        if ( result && result[0].length > 0)
            return false
        else
            return false
    } catch(error) {
        return false
    }

    
 }

 //RETORNA O RELACIONAMENTO PELO ID DA TABELA INTERMEDIÁRIA
 const getSelectByIdGenresBooks = async function (id) {

    try{
        let sql = `select * from tbl_genero_usuario where id_genero_usuario = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch(error){
        return false
    }
    
 }


 //RETORNA OS GÊNEROS DE UM LIVRO ESPECÍFICO
 const getSelectGenresByIdBooks = async function (idLivro) {
    try{
        let sql = `select
                   tbl_genero.id_genero,
                   tbl_genero.nome
                   from tbl_livro
                        join tbl_genero_livro on tbl_livro.id_livro = tbl_genero_usuario.id_livro
                        join tbl_genero on tbl_genero.id_genero = tbl_genero_livro.id_genero
                   where tbl_livro.id_livro = ${idLivro};`

        let result = await db.raw(sql)

        if(result && result[0].length > 0)
            return result[0]
        else  
            return false

    } catch(error){
        return false
    }
    
 }



 //RETORNA OS LIVROS QUE POSSUEM UM GÊNERO ESPECÍFICO
 const getSelectBooksByIdGenres = async function (idGenero) {
    try{
        let sql = `select
                    tbl_livro.id_livro,
                    tbl_livro.nome
                    from tbl_genero
                        join tbl_genero_livro on tbl_genero.id_genero = tbl_genero_livro.id_genero
                        join tbl_livro on tbl_livro.id_livro = tbl_genero_livro.id_livro
                    where tbl_genero.id_genero = ${idGenero};`
        
        let result = await db.raw(sql)

        if(result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch(error) {
        return false
    }
    
 }



 //INSERE UM NOVO RELACIONAMENTO
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

        //Verifica se a linha foi afetada no índice 0
        if(result && result[0]. length > 0)
            return true
        else
            return false
    }    catch(error){
        return false
    }
 }

 // INSERE VÁRIOS RELACIONAMENTOS DE UMA VEZ
 const setInsertMultiplesGenresBooks = async function (dados) {
    try{
        //Cria os blocos de valores: (id_genero, id_livro)
        const valores = dados.generos.map(id_genero =>
            `(${id_genero}, ${dados.id_livro})`
        ).join(',')

        let sql = `insert into tbl_genero_livro (id_genero, id_livro) values ${valores}`

        let result = await db.raw(sql)
        return !!(result && result[0].affectedRows >0)

    } catch (error){
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

        if(result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch(error){
        return false
    }
    
 }


 // DELETE UM RELACIONAMENTO
 const setDeleteGenresBooks = async function (generoLivro) {
    try{
        let sql = `delete from tbl_genero_livro where id_genero_usuario = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].affectedRows > 0)
            return true
        else
            return false

    }catch(error){
        return false
    }
 }



// DELETA OS RELACIONAMENTOS DE UM LIVRO
const setDeleteGenresByIdBook = async function (id) {
    try{
        let sql = `delete from tbl_genero_livro where id_livro = ?`
        let result = await db.raw(sql, [id])

        if(result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch(error){
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

