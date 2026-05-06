/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de generos no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.0
 *******************************************************************************************/

//CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection');

//RETORNA TODOS OS GENEROS DO BANCO
const getSelectAllGenres = async function () {
    try {
        let sql = `select * from tbl_genero order by id_genero asc`
        let result = await db.raw(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    }catch(error){
        return false
    }
}

//RETORNA GENERO PELO ID DO BANCO
const getSelectByIdGenre = async function (id) {
    try {
        let sql = `select * from tbl_genero where id_genero = ${id}`
        let result = await db.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return error
    }
}

//INSERE UM GENERO DENTRO DO BANCO
const setInsertGenre = async function (genero) {
    try {
        let sql = `insert into tbl_genero (
                        nome,
                        descricao
                    ) values (
                        '${genero.nome}',
                        '${genero.descricao}'
                    )`
        
        let result = await db.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return error
    }
}

//ATUALIZA UM GENERO DENTRO DO BANCO
const setUpdateGenre = async function (genero) {
    try {
        let sql = `update tbl_genero set 
                        nome = '${genero.nome}',
                        nomeUsuario = '${genero.descricao}'
                    where id_genero = ${genero.id}`
        
        let result = await db.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return error
    }
}

//DELETA UM GENERO DENTRO DO BANCO
const setDeleteGenre = async function (id) {
    try {
        let sql = `delete from tbl_genero where id_genero = ${id}`
        let result = await db.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return error
    }
    
}

module.exports = {
    getSelectAllGenres,
    getSelectByIdGenre,
    setInsertGenre,
    setUpdateGenre,
    setDeleteGenre
}