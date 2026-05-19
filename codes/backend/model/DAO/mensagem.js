/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de mensagem no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 14/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.2
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

// RETORNA TODAS AS MENSAGENS DE UM CLUBE ESPECÍFICO
const getSelectMessagesByIdClub = async function (idClube) {
    try {
        let sql = `select 
                    tbl_mensagem.id_mensagem,
                    tbl_mensagem.comentario,
                    tbl_mensagem.arquivo,
                    tbl_mensagem.data_postagem,
                    tbl_mensagem.id_mensagem_pai,
                    tbl_usuario.id_usuario,
                    tbl_usuario.nome_usuario,
                    tbl_usuario.foto_perfil
                   from tbl_mensagem
                        inner join tbl_conversa on tbl_mensagem.id_conversa = tbl_conversa.id_conversa
                        inner join tbl_usuario on tbl_mensagem.id_usuario = tbl_usuario.id_usuario
                   where tbl_conversa.id_clube = ?
                   order by tbl_mensagem.data_postagem asc`
        
        let result = await db.raw(sql, [idClube])

        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        console.error("Erro na DAO ao buscar mensagens do clube:", error)
        return false
    }
}

// RETORNA TODAS AS RESPOSTAS (THREADS) DE UMA MENSAGEM/POST ESPECÍFICO
const getRepliesByMessageId = async function (idMensagemPai) {
    try {
        let sql = `select 
                    tbl_mensagem.id_mensagem,
                    tbl_mensagem.comentario,
                    tbl_mensagem.arquivo,
                    tbl_mensagem.data_postagem,
                    tbl_mensagem.id_mensagem_pai,
                    tbl_usuario.id_usuario,
                    tbl_usuario.nome_usuario,
                    tbl_usuario.foto_perfil
                   from tbl_mensagem
                        inner join tbl_usuario on tbl_mensagem.id_usuario = tbl_usuario.id_usuario
                   where tbl_mensagem.id_mensagem_pai = ?
                   order by tbl_mensagem.data_postagem asc` // Ordem cronológica das respostas
        
        let result = await db.raw(sql, [idMensagemPai])

        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        console.error("Erro na DAO ao buscar respostas da mensagem:", error)
        return false
    }
}

// RETORNA APENAS AS MENSAGENS PRINCIPAIS (POSTS INICIAIS) DE UM CLUBE ESPECÍFICO
const getMainMessagesByClubId = async function (idClube) {
    try {
        let sql = `select 
                    tbl_mensagem.id_mensagem,
                    tbl_mensagem.comentario,
                    tbl_mensagem.arquivo,
                    tbl_mensagem.data_postagem,
                    tbl_mensagem.id_mensagem_pai,
                    tbl_usuario.id_usuario,
                    tbl_usuario.nome_usuario,
                    tbl_usuario.foto_perfil
                   from tbl_mensagem
                        inner join tbl_conversa on tbl_mensagem.id_conversa = tbl_conversa.id_conversa
                        inner join tbl_usuario on tbl_mensagem.id_usuario = tbl_usuario.id_usuario
                   where tbl_conversa.id_clube = ? 
                     and tbl_mensagem.id_mensagem_pai is null
                   order by tbl_mensagem.data_postagem desc` // 'desc' para ver os posts mais recentes no topo do feed
        
        let result = await db.raw(sql, [idClube])

        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        console.error("Erro na DAO ao buscar mensagens principais do clube:", error)
        return false
    }
}

// RETORNA AS MENSAGENS PRINCIPAIS DO FEED GERAL (COM OU SEM CLUBE VINCULADO)
const getAllMainMessagesFeed = async function () {
    try {
        let sql = `select 
                    tbl_mensagem.id_mensagem,
                    tbl_mensagem.comentario,
                    tbl_mensagem.arquivo,
                    tbl_mensagem.data_postagem,
                    tbl_usuario.id_usuario,
                    tbl_usuario.nome_usuario,
                    tbl_usuario.foto_perfil
                   from tbl_mensagem
                        inner join tbl_conversa on tbl_mensagem.id_conversa = tbl_conversa.id_conversa
                        inner join tbl_usuario on tbl_mensagem.id_usuario = tbl_usuario.id_usuario
                        left join tbl_clube on tbl_conversa.id_clube = tbl_clube.id_clube -- LEFT JOIN aceita NULL se for post geral
                   where tbl_mensagem.id_mensagem_pai is null
                   order by tbl_mensagem.data_postagem desc`
        
        let result = await db.raw(sql)

        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        console.error("Erro na DAO ao buscar feed principal geral:", error)
        return false
    }
}

// INSERE UMA MENSAGEM
const setInsertMessage = async function (mensagem) {
    try {
        // O Knex/MySQL aceita a palavra null nativa do JS se passarmos via parâmetro (?)
        // Aqui garantimos o mapeamento correto dos campos que podem ser nulos
        const arquivo = mensagem.arquivo && mensagem.arquivo !== '' ? mensagem.arquivo : null;
        const idMensagemPai = mensagem.id_mensagem_pai && mensagem.id_mensagem_pai !== '' ? mensagem.id_mensagem_pai : null;

        let sql = `
         insert into tbl_mensagem (
                comentario,
                arquivo,
                id_usuario,
                id_mensagem_pai,
                id_conversa
         ) values (?, ?, ?, ?, ?)` // 5 interrogações bem separadas por vírgulas

        // Passamos os dados estritamente na ordem das interrogações acima
        let result = await db.raw(sql, [
            mensagem.comentario,
            arquivo,
            mensagem.id_usuario,
            idMensagemPai,
            mensagem.id_conversa
        ])

        // Verifica se a linha foi afetada com sucesso
        if (result && result[0].affectedRows > 0)
            return true
        else
            return false

    } catch (error) {
        // Log para você ver exatamente o que o banco reclamou caso falhe por outra coisa (como FK inexistente)
        console.error("🚨 ERRO NO BANCO AO INSERIR MENSAGEM:", error.message);
        return false
    }
}

// ATUALIZA UMA MENSAGEM (Geralmente usada para editar o texto ou o anexo de um post)
const setUpdateMessages = async function (mensagem) {
    try {
        // Tratamento para o arquivo (caso o usuário queira remover o anexo na edição, vira null)
        const arquivo = mensagem.arquivo && mensagem.arquivo !== '' ? mensagem.arquivo : null;

        // Montamos a query usando os placeholders '?' para o Knex tratar as strings e nulos
        let sql = `update tbl_mensagem set
                        comentario = ?,
                        arquivo = ?
                   where id_mensagem = ?`

        // Passamos os valores na ordem exata das interrogações
        let result = await db.raw(sql, [
            mensagem.comentario,
            arquivo,
            mensagem.id_mensagem // Corrigido: pegando de dentro do objeto mensagem
        ])

        // Verifica se o MySQL de fato alterou ou encontrou a linha
        if (result && result[0] && result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.error("🚨 ERRO NO BANCO AO ATUALIZAR MENSAGEM:", error.message);
        return false
    }
}

// DELETA UMA MENSAGEM, SUAS RESPOSTAS E SUAS CURTIDAS (Funciona para mensagens com ou sem replies)
const setDeleteMessageWithReplies = async function (idMensagem) {
    const transaction = await db.transaction();

    try {
        //DELETA as curtidas das respostas
        let sqlCurtidasFilhas = `delete from tbl_curtida 
                                where id_mensagem in (select id_mensagem from tbl_mensagem where id_mensagem_pai = ${idMensagem})`
        await transaction.raw(sqlCurtidasFilhas)

        //Deleta as curtidas da própria mensagem principal
        let sqlCurtidasPrincipal = `delete from tbl_curtida where id_mensagem = ${idMensagem}`
        await transaction.raw(sqlCurtidasPrincipal)

        //Deleta todas as respostas
        let sqlFilhas = `delete from tbl_mensagem where id_mensagem_pai = ${idMensagem}`
        await transaction.raw(sqlFilhas)

        //Deleta a mensagem principal
        let sqlPrincipal = `delete from tbl_mensagem where id_mensagem = ${idMensagem}`
        let resultPrincipal = await transaction.raw(sqlPrincipal)

        await transaction.commit();

        if (resultPrincipal && resultPrincipal[0].affectedRows > 0) {
            return true
        }
        
        return false

    } catch (error) {
        await transaction.rollback();
        return false
    }
}

// DELETA TODAS AS MENSAGENS E CURTIDAS DE UM CLUBE ESPECÍFICO
const setDeleteAllMessagesByClubId = async function (idClube) {
    const transaction = await db.transaction();

    try {
        //Deleta todas as curtidas das mensagens que pertencem à conversa/chat desse clube
        let sqlCurtidas = `delete from tbl_curtida 
                           where id_mensagem in (
                               select id_mensagem from tbl_mensagem 
                               where id_conversa = (select id_conversa from tbl_conversa where id_clube = ?)
                           )`
        await transaction.raw(sqlCurtidas, [idClube])

        //Deleta primeiro as respostas (mensagens filhas) para não quebrar a Foreign Key do auto-relacionamento
        let sqlRespostas = `delete from tbl_mensagem 
                            where id_mensagem_pai is not null 
                              and id_conversa = (select id_conversa from tbl_conversa where id_clube = ?)`
        await transaction.raw(sqlRespostas, [idClube])

        //Agora que as respostas sumiram, deleta as mensagens principais (posts iniciais) do clube
        let sqlPrincipais = `delete from tbl_mensagem 
                             where id_conversa = (select id_conversa from tbl_conversa where id_clube = ?)`
        let result = await transaction.raw(sqlPrincipais, [idClube])

        //Confirma a limpa total no banco
        await transaction.commit();

        //Se a query rodou com sucesso (mesmo que o clube já estivesse sem mensagens), retornamos true
        return true;

    } catch (error) {
        //Se der ruim em qualquer passo, desfaz tudo
        await transaction.rollback();
        console.error("🚨 ERRO CRÍTICO AO LIMPAR MENSAGENS DO CLUBE:", error.message)
        return false
    }
}

// DELETA TODAS AS MENSAGENS, RESPOSTAS E CURTIDAS VINCULADAS A UM USUÁRIO ESPECÍFICO
const setDeleteAllMessagesByUserId = async function (idUsuario) {
    const transaction = await db.transaction();

    try {
        //Deleta as curtidas recebidas nas RESPOSTAS dos posts desse usuário
        let sqlCurtidasRespostas = `
            delete from tbl_curtida 
            where id_mensagem in (
                select id_mensagem from tbl_mensagem 
                where id_mensagem_pai in (select id_mensagem from tbl_mensagem where id_usuario = ?)
            )`
        await transaction.raw(sqlCurtidasRespostas, [idUsuario])

        //Deleta as curtidas recebidas nas mensagens principais dele
        let sqlCurtidasPrincipais = `
            delete from tbl_curtida 
            where id_mensagem in (select id_mensagem from tbl_mensagem where id_usuario = ?)`
        await transaction.raw(sqlCurtidasPrincipais, [idUsuario])

        //Deleta as respostas (comentários) que outros usuários deixaram nos posts dele
        // Usamos um subquery com 'as tm' para o MySQL não reclamar de travar a tabela durante o delete
        let sqlRespostasDeTerceiros = `
            delete from tbl_mensagem 
            where id_mensagem_pai in (
                select id_mensagem from (select id_mensagem from tbl_mensagem where id_usuario = ?) as tm
            )`
        await transaction.raw(sqlRespostasDeTerceiros, [idUsuario])

        //Agora que a área está limpa de dependências, deleta todas as mensagens do próprio usuário
        // Isso inclui tanto os posts principais dele quanto as respostas que ele deu nos posts de outras pessoas
        let sqlMensagensDoUsuario = `delete from tbl_mensagem where id_usuario = ?`
        let result = await transaction.raw(sqlMensagensDoUsuario, [idUsuario])

        //Confirma as deleções em lote no banco
        await transaction.commit();

        return true;

    } catch (error) {
        //Se der qualquer erro de constraint, desfaz tudo para não corromper os históricos
        await transaction.rollback();
        return false
    }
}

module.exports = {
    getSelectAllMessages,
    getSelectByIdMessage,
    getSelectMessagesByIdClub,
    getRepliesByMessageId,
    getMainMessagesByClubId,
    getAllMainMessagesFeed,
    setInsertMessage,
    setUpdateMessages,
    setDeleteAllMessagesByClubId,
    setDeleteAllMessagesByUserId,
    setDeleteMessageWithReplies
}