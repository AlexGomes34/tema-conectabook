/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de clubes no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1 (Ajustado para retornar apenas o índice [0])
 *******************************************************************************************/

// CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection')

// RETORNA TODOS OS CLUBES
const getSelectAllClubs = async function () {
    try {
        // Usamos LEFT JOIN para garantir que clubes com 0 membros também apareçam
        // O GROUP BY é essencial para que o COUNT funcione por clube
        let sql = `
            select 
                tbl_clube.id_clube, 
                tbl_clube.nome, 
                tbl_clube.foto, 
                tbl_clube.sobre, 
                tbl_genero.nome as genero,
                count(tbl_membros.id_usuario) as total_membros
            from tbl_clube
                left join tbl_genero 
                    on tbl_genero.id_genero = tbl_clube.id_genero
                left join tbl_membros 
                    on tbl_clube.id_clube = tbl_membros.id_clube
            group by tbl_clube.id_clube
            order by tbl_clube.id_clube asc`;

        let result = await db.raw(sql);

        if (result && result[0].length > 0)
            return result[0];
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
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


// RETORNA CLUBE PELO ID DO GENERO
const getSelectClubsByGeneroID = async function (idGenero) {
    try {
        let sql = `
            select 
                tbl_clube.id_clube, 
                tbl_clube.nome, 
                tbl_clube.foto, 
                tbl_clube.sobre, 
                tbl_genero.nome as genero,
                count(tbl_membros.id_usuario) as total_membros
            from tbl_clube
                inner join tbl_genero 
                    on tbl_genero.id_genero = tbl_clube.id_genero
                left join tbl_membros 
                    on tbl_clube.id_clube = tbl_membros.id_clube
            where tbl_clube.id_genero = ?
            group by tbl_clube.id_clube
            order by tbl_clube.nome asc`;

        let result = await db.raw(sql, [idGenero]);

        if (result && result[0].length > 0)
            return result[0];
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

// INSERE UM CLUBE NO BANCO
const setInsertClub = async function (clube) {
    try {
        const foto = clube.foto && clube.foto !== '' ? clube.foto : null;

        let sql = `insert into tbl_clube (
                        nome,
                        sobre,
                        regras,
                        foto,
                        id_genero
                    ) values (?, ?, ?, ?, ?)` 
        let result = await db.raw(sql, [
            clube.nome,
            clube.sobre,
            clube.regras,
            foto,
            clube.id_genero
        ])

        // Se a linha foi afetada, retorna o ID gerado pelo auto_increment
        if (result && result[0] && result[0].affectedRows > 0) {
            return result[0].insertId; // 🔥 Retorna o ID do clube novinho em folha
        } else {
            return false;
        }
        
    } catch (error) {
        return false;
    }
}

// ATUALIZA UM CLUBE NO BANCO
const setUpdateClub = async function (clube) {
    try {
        const foto = clube.foto ? `'${clube.foto}'` : "NULL";
        let sql = `update tbl_clube set 
                    nome = '${clube.nome}',
                    sobre = '${clube.sobre}',
                    regras = '${clube.regras}',
                    foto = '${foto}',
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

// DELETA UM CLUBE LIMPANDO TODAS AS DEPENDÊNCIAS EM CASCATA VIA CÓDIGO
const setDeleteClub = async function (idClube) {
    // Iniciamos uma transação para garantir a segurança dos dados
    const transaction = await db.transaction();

    try {
        // 1º PASSO: Buscar o ID da conversa desse clube para sabermos o que apagar nas mensagens
        let sqlConversa = `select id_conversa from tbl_conversa where id_clube = ?`;
        let resultadoConversa = await transaction.raw(sqlConversa, [idClube]);

        if (resultadoConversa && resultadoConversa[0].length > 0) {
            let idConversa = resultadoConversa[0][0].id_conversa;

            // 2º PASSO: Deleta as curtidas das mensagens que pertencem a essa conversa
            await transaction.raw(`
                delete from tbl_curtida 
                where id_mensagem in (select id_mensagem from tbl_mensagem where id_conversa = ?)
            `, [idConversa]);

            // 3º PASSO: Deleta as respostas (comentários com id_mensagem_pai) primeiro
            await transaction.raw(`
                delete from tbl_mensagem 
                where id_mensagem_pai is not null and id_conversa = ?
            `, [idConversa]);

            // 4º PASSO: Deleta as mensagens principais da conversa do clube
            await transaction.raw(`delete from tbl_mensagem where id_conversa = ?`, [idConversa]);

            // 5º PASSO: Agora que a conversa está limpa, deleta a linha da tbl_conversa
            await transaction.raw(`delete from tbl_conversa where id_conversa = ?`, [idConversa]);
        }

        // 6º PASSO: Deleta todos os membros vinculados a esse clube na tbl_membros
        // (Ajuste o nome da tabela 'tbl_membro' ou 'tbl_clube_usuario' se for diferente no seu banco)
        await transaction.raw(`delete from tbl_membros where id_clube = ?`, [idClube]);

        // 7º PASSO: Finalmente, com todas as chaves estrangeiras limpas, deleta o clube
        let result = await transaction.raw(`delete from tbl_clube where id_clube = ?`, [idClube]);

        // Se tudo rodou sem erros até aqui, salva as alterações definitivamente no banco
        await transaction.commit();

        if (result && result[0].affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        // Se qualquer um dos passos falhar, desfaz tudo o que foi feito para não quebrar o banco
        await transaction.rollback();
        console.error("🚨 ERRO CRÍTICO AO DELETAR CLUBE EM CASCATA:", error.message);
        return false;
    }
}

module.exports = {
    getSelectAllClubs,
    getSelectByIdClub,
    setInsertClub,
    setUpdateClub,
    setDeleteClub
}