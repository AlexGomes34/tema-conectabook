/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de clubes no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1 (Ajustado para retornar apenas o índice [0])
 *******************************************************************************************/

// CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection')

//RETORNA TODOS OS CLUBES DO BANCO
const getSelectAllClubs =  async function () {
    try {
        let sql = `select * from tbl_clube order by id_clube asc`
        let result = await db.raw(sql)

        //Retorna apenas a lista de dados (índice 0)
        if(result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch(error) {
        return false
    }
    
}

// RETORNA CLUBE PELO ID
const getSelectByIdClub = async function(id){
    try {
        let sql = `select * from tbl_clube where id_clube = ${id}`
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


// INSERE UM CLUBE NO BANCO
const setInsertClub = async function (clube) {
    try {
        let sql = `insert into tbl_clube (
                        nome,
                        sobre,
                        regras,
                        foto,
                        id_membros,
                        id_genero
                        )  values (
                        '${clube.nome}',
                        '${clube.sobre}',
                        '${clube.regras}',
                        '${clube.foto}',
                        '${clube.id_membros}',
                        '${clube.id_genero}'
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

// ATUALIZA UM CLUBE NO BANCO
const setUpdateClub = async function (clube) {
    try {
        let sql = `update tbl_clube set 
                    nome = '${clube.nome}',
                    sobre = '${clube.sobre}',
                    regras = '${clube.regras}',
                    foto = '${clube.foto}',
                    id_membros = '${clube.id_membros}',
                    id_genero = '${clube.id_genero}'
                Where id_clube = ${clube.id} `

        let result = await db.raw(sql)

        if(result && result[0].affectedRows > 0) 
            return true
        else
            return false
    } catch (error) {
        return false
    }
    
}

// DELETA UM CLUBE NO BANCO
const setDeleteClub = async function (id) {
    try{
        let sql = `delete from tbl_clube where id_clube = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].affectedRows > 0)
            return true
        else
            return false
    } catch (error) {
        return false
    }
    
}

module.exports = {
    getSelectAllClubs,
    getSelectByIdClub,
    setInsertClub,
    setUpdateClub,
    setDeleteClub
}