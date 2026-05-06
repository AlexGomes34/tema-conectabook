/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de usuários e generos no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.0
 *******************************************************************************************/

//CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection');

//RETORNA TODOS OS USUARIOS E SEUS GENEROS DO BANCO
const getSelectAllGenresUsers = async function () {
    try {
        let sql = `select * from tbl_genero_usuario order by id_genero_usuario asc`
        let result = await db.raw(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    }catch(error){
        return false
    }
}

//RETORNA O USUARIO E GENERO PELO ID DO BANCO
const getSelectByIdGenresUsers = async function (id) {
    try {
        let sql = `select * from tbl_genero_usuario where id_genero_usuario = ${id}`
        let result = await db.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return error
    }
}

//RETORNA OS GENEROS PELO ID DO USUARIO DO BANCO
const getSelectGenresByIdUsers = async function (idUsuario) {
    try {
        let sql = `select
                    tbl_genero.id_genero, 
	                tbl_genero.nome
	                from tbl_usuario
		                join tbl_genero_usuario on tbl_usuario.id_usuario = tbl_genero_usuario.id_usuario 
		                join tbl_genero on tbl_genero.id_genero = tbl_genero_usuario.id_genero
	                where tbl_usuario.id_usuario = ${idUsuario};`
        let result = await db.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return error
    }
}

//RETORNA OS USUARIOS PELO ID DO GENERO DO BANCO
const getSelectUsersByIdGenres = async function (idGenero) {
    try {
        let sql = `select
                    tbl_usuario.id_usuario, 
	                tbl_usuario.nome
	                from tbl_genero
		                join tbl_genero_usuario on tbl_genero.id_genero = tbl_genero_usuario.id_genero
		                join tbl_usuario on tbl_usuario.id_usuario = tbl_genero_usuario.id_usuario
	                where tbl_genero.id_genero = ${idGenero};`
        let result = await db.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return error
    }
}

//INSERE UM NOVO RELACIONAMENTO GENERO USUARIO DENTRO DO BANCO
const setInsertGenresUsers = async function (generoUsuario) {
    try {
        let sql = `insert into tbl_genero_usuario (
                        id_genero,
                        id_usuario
                    ) values (
                        ${generoUsuario.id_genero},
                        ${generoUsuario.id_usuario}
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

//ATUALIZA UM RELACIONAMENTO GENERO USUARIO DENTRO DO BANCO
const setUpdateGenresUsers = async function (generoUsuario) {
    try {
        let sql = `update tbl_genero_usuario set 
                        id_genero = ${generoUsuario.id_genero},
                        id_usuario = ${generoUsuario.id_usuario}
                    where id_genero_usuario = ${generoUsuario.id_genero_usuario}`
        
        let result = await db.raw(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    }catch(error){
        return error
    }
}

//DELETA UM USUARIO DENTRO DO BANCO
const setDeleteGenresUsers = async function (id) {
    try {
        let sql = `delete from tbl_genero_usuario where id_genero_usuario = ${id}`
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
    getSelectAllGenresUsers,
    getSelectByIdGenresUsers,
    getSelectGenresByIdUsers,
    getSelectUsersByIdGenres,
    setInsertGenresUsers,
    setUpdateGenresUsers,
    setDeleteGenresUsers
}