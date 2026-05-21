/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de avaliação no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 14/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1 
 *******************************************************************************************/

const db = require('../../database/connection')

//RETORNA TODOS AS AVALIAÇÕES DO BANCO
const getSelectAllRatings = async function () {
    try {
        let sql = `select * from tbl_avaliacao order by id_avaliacao asc`
        let result = await db.raw(sql)

        if(result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
    
}


// RETORNA AVALIAÇÃO PELO ID
const getSelectByIdRating =  async function  (id) {
    try {
        let sql = `select * from tbl_avaliacao where id_avaliacao = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].length > 0 )
            return result[0]
        else
            return false
    } catch (error){
        return false
    }
    
}

// RETORNA AVALIAÇÃO PELO ID DO USUARIO
const getSelectRatingByIdUser = async function (idUsuario) {
    try {
        let sql = `
           select
               tbl_avaliacao.id_avaliacao,
               tbl_avaliacao.estrelas,
               tbl_avaliacao.mensagem,
               tbl_avaliacao.data_avaliacao,
               tbl_usuario.nome as usuario
            from tbl_avaliacao
                inner join tbl_usuario
                    on tbl_usuario.id_usuario = tbl_avaliacao.id_usuario
            where tbl_avaliacao.id_usuario = ?
            order by tbl_avaliacao.data_avaliacao asc`

    
        let result = await db.raw(sql, [idUsuario]);

        if (result && result[0] && result[0].length > 0) 
            return result[0];
        else
            return false  
    } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        return false; 
    }
}


//INSERE UMA AVALIAÇÃO 
const setInsertRating = async function (avaliacao) {
    try {
        let sql = `insert into tbl_avaliacao (
                    estrelas,
                    mensagem,
                    id_usuario,
                    data_avaliacao
                    ) values (
                     '${avaliacao.estrelas}',
                     '${avaliacao.mensagem}',
                     '${avaliacao.id_usuario}',
                     '${avaliacao.data_avaliacao}'        
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


// ATUALIZA UMA AVALIAÇÃO
const setUpdateRating = async function (avaliacao) {
    try{
        let sql = `update tbl_avaliacao set
                       estrelas = '${avaliacao.estrelas}',
                       mensagem = '${avaliacao.mensagem}',
                       id_usuario = '${avaliacao.id_usuario}',
                       data_avaliacao = '${avaliacao.data_avaliacao}'
                  where id_avaliacao = ${avaliacao.id}`

         let result = await db.raw(sql)

        if (result && result[0].affectedRows > 0)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


// DELETA UMA AVALIAÇÃO 
const setDeleteRating = async function (id) {
    try{
        let sql = `delete from tbl_avaliacao where id_avaliacao = ${id}`
        let result = await db.raw(sql)

        if (result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// DELETA OS RELACIONAMENTOS DE UM USUÁRIO

module.exports = {
    getSelectAllRatings,
    getSelectByIdRating,
    setInsertRating,
    setUpdateRating,
    setDeleteRating
}