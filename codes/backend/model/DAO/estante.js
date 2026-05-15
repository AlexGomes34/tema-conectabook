/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de estante no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 12/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1
 *******************************************************************************************/

// CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection')

//LISTA TODAS AS ESTANTES
const getSelectAllBookcase = async function () {
    try{
        let sql = `select * from tbl_estante;`
        let result = await db.raw(sql)

        if(result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch(error) {
        return false
    }
    
}


// RETORNA ESTANTE PELO ID
const getSelectByIdBookcase = async function (id) {
    try{
        let sql = `select * from tbl_estante where id_estante = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch(error) {
        return false
    }
    
}


const setInsertBookcase = async function (estante) {
    try {
        
        let sql = `insert into tbl_estante(
                    id_usuario,
                    id_status_livro,
                    id_livro,
                    data_adicao
                ) values (
                 '${estante.id_usuario}',
                 '${estante.id_status_livro}',
                 '${estante.id_livro}',
                 '${estante.data_adicao}
                  )`

        let result = await db.raw(sql)

        if(result && result[0].affectedRows > 0)
            return result[0]
        else
            return false

    } catch(error) {
        return false
    }
    
}


// ATUALIZA UMA ESTANTE
const setUpdateBookcase = async function (estante) {
    try {
        let sql = `update tbl_estante set
                    id_usuario = '${estante.id_usuario}',
                    id_status_livro = '${estante.id_status_livro}',
                    id_livro = '${estante.id_livro}',
                    data_adicao = '${estante.data_adicao}'
                where id_estante = ${estante.id}
                    `
        let result = await db.raw(sql)

      if(result && result[0].affectedRows > 0)
        return true
    else
        return false
            
  }catch(error){
             return false
            }
 }


// DELETA UMA ESTANTE DO BANCO DE DADOS
const setDeleteBookcase = async function (id) {
    try{
        let sql = `delete from tbl_estante where id_estante = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].affectedRows > 0)
            return true
        else
            return false

    } catch(error){
        return false
    }
    
}

module.exports = {
    getSelectAllBookcase,
    getSelectAllBookcase,
    setInsertBookcase,
    setUpdateBookcase,
    setDeleteBookcase
}