/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de curtidas no Banco de Dados
 * Projeto: ConectaBook
 * Data: 21/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.0
 *******************************************************************************************/

// CONEXÃO COM O BD
const db = require('../../database/connection')

//RETORNA TODAS AS CURTIDAS DO BANCO
const getSelectAllLikes = async function () {
    try {
        let sql = `select * from tbl_curtida by id_curtida asc`

        let result = await db.raw(sql)

        if(result && result[0].length > 0){
            return result[0]
        } else {
            return false
        }
    } catch(error){
        return false
    }
    
}


//RETORNA UMA CURTIDA PELO ID
const getSelectByIdLike = async function (id) {
    try{
        let sql = `select * from tbl_curtida where id_curtida = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].length > 0){
            return result[0]
        } else {
            return false
        }
    } catch(error) {
        return false
    }
    
}

//RETORNA CURTIDAS PELO ID DO USUÁRIO

//INSERE UMA CURTIDA
const setInsertLike = async function (curtida) {
    try{
        let sql = `insert into tbl_curtida (
                   id_usuario,
                   id_mensagem
                   ) values (
                   ${curtida.id_usuario},
                   ${curtida.id_mensagem}
                   )`


      let result = await db.raw(sql)

        if (result && result[0].affectedRows > 0)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//ATUALIZA UMA CURTIDA
const setUpdateLike = async function (curtida) {
    try{
        let sql = `update tbl_curtida set
                     id_usuario = '${curtida.id_usuario}',
                     id_mensagem = '${curtida.id_mensagem}'
                    where id_curtida = ${curtida.id} `

        let result = await db.raw(sql)

        if (result && result[0].affectedRows > 0)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

//DELETA UMA CURTIDA
const setDeleteLike = async function (id) {
    try {
        let sql = `delete from tbl_curtida where id_curtida = ${id}`
        let result = await db.raw(sql)

        if (result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
//DELETA UMA CURTIDA POR USUÁRIO




module.exports = {
    getSelectAllLikes,
    getSelectByIdLike,
    setInsertLike,
    setUpdateLike,
    setDeleteLike
}