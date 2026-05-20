/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de notificações no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 19/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.0
 *******************************************************************************************/

const db = require('../../database/connection')

//RETORNA TODAS AS NOTIFICAÇÕES
const getSelectedAllNotifications = async function () {
    try{
        let sql = `select * from tbl_notificacao order by id_notificacao asc`
        let result = await db.raw(sql)

        if(result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}