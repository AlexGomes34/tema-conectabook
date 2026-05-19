/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de conversa no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 19/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.0
 *******************************************************************************************/

const db = require('../../database/connection')

// RETORNA TODAS AS CONVERSAS (Uso técnico)
const getSelectAllConversations = async function () {
    try {
        let sql = `select * from tbl_conversa order by id_conversa asc`
        let result = await db.raw(sql)

        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

// BUSCA UMA CONVERSA ESPECÍFICA PELO ID
const getSelectByIdConversation = async function (id) {
    try {
        let sql = `select * from tbl_conversa where id_conversa = ?`
        let result = await db.raw(sql, [id])

        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

// BUSCA A CONVERSA DE UM CLUBE ESPECÍFICO (Útil para achar o id_conversa antes de listar mensagens)
const getConversationByClubId = async function (idClube) {
    try {
        let sql = `select * from tbl_conversa where id_clube = ?`
        let result = await db.raw(sql, [idClube])

        if (result && result[0].length > 0)
            return result[0][0] // Retorna apenas o objeto da conversa encontrado
        else
            return false
    } catch (error) {
        return false
    }
}

// INSERE UMA NOVA CONVERSA (Gera o ID que será amarrado na tbl_mensagem)
const setInsertConversation = async function (conversa) {
    try {
        // Se não for passado id_clube (ou seja, se for para o Feed Geral), vira NULL nativo
        const idClube = conversa.id_clube && conversa.id_clube !== '' ? conversa.id_clube : null;

        let sql = `insert into tbl_conversa (id_clube) values (?)`
        let result = await db.raw(sql, [idClube])

        // Em inserts de ID Auto_Increment, o MySQL retorna o ID gerado em 'insertId'
        if (result && result[0].affectedRows > 0) {
            return result[0].insertId; // 🔥 Retorna o ID gerado para a controller saber onde salvar a mensagem!
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

// DELETA UMA CONVERSA APAGANDO AUTOMATICAMENTE TUDO O QUE ESTÁ VINCULADO A ELA
const setDeleteConversation = async function (idConversa) {
    const transaction = await db.transaction();

    try {
        // 1º PASSO: Deleta as curtidas das mensagens que pertencem a essa conversa
        await transaction.raw(`
            delete from tbl_curtida 
            where id_mensagem in (select id_mensagem from tbl_mensagem where id_conversa = ?)
        `, [idConversa]);

        // 2º PASSO: Deleta as respostas (mensagens filhas) dessa conversa
        await transaction.raw(`
            delete from tbl_mensagem 
            where id_mensagem_pai is not null and id_conversa = ?
        `, [idConversa]);

        // 3º PASSO: Deleta as mensagens principais dessa conversa
        await transaction.raw(`delete from tbl_mensagem where id_conversa = ?`, [idConversa]);

        // 4º PASSO: Agora sim, deleta a conversa de vez
        let result = await transaction.raw(`delete from tbl_conversa where id_conversa = ?`, [idConversa]);

        await transaction.commit();

        if (result && result[0].affectedRows > 0)
            return true;
        else
            return false;

    } catch (error) {
        await transaction.rollback();
        return false;
    }
}

module.exports = {
    getSelectAllConversations,
    getSelectByIdConversation,
    getConversationByClubId,
    setInsertConversation,
    setDeleteConversation
}