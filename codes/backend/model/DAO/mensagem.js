/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de mensagem no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 14/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1 
 *******************************************************************************************/

const db = require('../../database/connection')

// RETORNA TODAS AS MENSAGENS
const getSelectAllMessages = async function () {
     try{
        let sql = `select * from tbl_mensagem order by id_mensagem asc`
        let result = await db.raw(sql)

        if(result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
    
}


// RETORNA UMA MENSAGEM PELO ID
const getSelectByIdMessage = async function (id) {
    try {
        let sql = `select * from tbl_mensagem where id_mensagem = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].length > 0 )
            return result[0]
        else
            return false
    } catch (error){
        return false
    }
    
}


/* RETORNA MENSAGENS PELO ID DO USUÁRIO
const getSelectMessagesByIdUser =  async function (idUsuario) {
    try{
        let sql = `
            select
               tbl_usuario.id_usuario,
               tbl_usuario.nome
               from tbl_mensagem
                     join tbl_

        
        
        `
    }
    
}
*/

// INSERE UMA MENSAGEM
const setInsertMessage = async function (mensagem) {
    try{
        let sql = `
         insert into tbl_mensagem (
                id_status,
                comentario,
                arquivo_externo,
                data_postagem,
                id_usuario
                ) values (
                ${mensagem.id_status},
                ${mensagem.comentario},
                ${mensagem.arquivo_externo},
                ${mensagem.data_postagem},
                ${mensagem.id_usuario}
                )`


        let result = await db.raw(sql)

        // Verifica se a linha foi afetada no índice 0
        if(result && result[0].affectedRows > 0)
            return true
        else
            return false

    }catch(error){
        return false
    }
}


// ATUALIZA UMA MENSAGEM
const setUpdateMessages = async function (mensagem) {
    try {
        let sql = `update tbl_mensagem set
                        id_status = ${mensagem.id_status},
                        comentario = ${mensagem.comentario},
                        arquivo_externo = ${mensagem.arquivo_externo},
                        data_postagem = ${mensagem.data_postagem},
                        id_usuario = ${mensagem.id_usuario}
                   where id_mensagem = ${mensagem.id_mensagem}`

        let result = await db.raw(sql)

        if(result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch(error){
        return false
    }
    
}

// DELETA UMA MENSAGEM
const setDeleteMessages = async function (id) {
    try{
        let sql = `delete from tbl_mensagem where id_mensagem = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].affectedRows > 0)
            return true
        else
            return false

    }catch(error){
        return false
    }
}


// DELETA OS RELACIONAMENTOS DE UM USUÁRIO
const setDeleteMessagesByIdUser = async function (id) {
    try{
        let sql = `delete from tbl_mensagem where id_usuario = ?`
        let result = await db.raw(sql, [id])

       if(result && result[0].affectedRows > 0)
            return true
        else
            return false

    } catch(error) {
        return false
    }
}


module.exports = {
    getSelectAllMessages,
    getSelectByIdMessage,
    setInsertMessage,
    setUpdateMessages,
    setDeleteMessages,
    setDeleteMessagesByIdUser
}