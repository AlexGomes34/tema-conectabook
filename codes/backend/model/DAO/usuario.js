/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de usuários no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.1 
 *******************************************************************************************/

//CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection');
const { setInsertGenresUsers } = require('./genero_usuario');

//RETORNA TODOS OS USUARIOS DO BANCO
const getSelectAllUsers = async function () {
    try {
        let sql = `select * from tbl_usuario;`
        let result = await db.raw(sql)

        if (result && result[0].length > 0)
            return result[0]
        else
            return false
    }catch(error){
        return false
    }
}

//RETORNA USUARIO PELO ID DO BANCO
const getSelectByIdUser = async function (id) {
    try {
        let sql = `select * from tbl_usuario where id_usuario = ${id}`
        let result = await db.raw(sql)

        // Retorna o índice 0 (dados)
        if(result && result[0].length > 0)
            return result[0]
        else
            return false
    }catch(error){
        return false
    }
}
const setInsertUser = async function (usuario) {
    try {
        // CORREÇÃO: Usando data_nascimento (com underline) para bater com a Controller/Postman
        const foto = usuario.foto_perfil ? `'${usuario.foto_perfil}'` : "NULL";
        const nascimento = usuario.data_nascimento ? `'${usuario.data_nascimento}'` : "NULL";

        let sql = `insert into tbl_usuario (
                        nome,
                        nome_usuario,
                        email,
                        senha,
                        data_nascimento,
                        foto_perfil
                    ) values (
                        '${usuario.nome}',
                        '${usuario.nome_usuario}',
                        '${usuario.email}',
                        '${usuario.senha}',
                        ${nascimento},
                        ${foto}
                    )`
        
        let result = await db.raw(sql);

        if(result && result[0].affectedRows > 0)
            return true;
        else
            return false;

    } catch(error) {
        console.log("ERRO AO INSERIR:", error.sqlMessage);
        return false;
    }
}

//ATUALIZA UM USUARIO DENTRO DO BANCO
const setUpdateUser = async function (usuario) {
    try {
        let sql = `update tbl_usuario set 
                        nome = '${usuario.nome}',
                        nome_usuario = '${usuario.nome_usuario}',
                        email = '${usuario.email}',
                        senha = '${usuario.senha}',
                        data_nascimento = '${usuario.data_nascimento}',
                        foto_perfil = '${usuario.foto_perfil}'
                    where id_usuario = ${usuario.id}`
        
        let result = await db.raw(sql)

        if(result && result[0].affectedRows > 0)
            return true
        else
            return false

    }catch(error){
        return false
    }
}

//Pega o usuario com base no email dele
const getSelectUserByEmail = async function(email) {
    try {
        let sql = `select * from tbl_usuario where email = '${email}'`;
        let result = await db.raw(sql);

        if (result && result[0].length > 0)
            return result[0];
        else
            return false;
    } catch (error) {
        return false;
    }
}

//DELETA UM USUARIO DENTRO DO BANCO
const setDeleteUser = async function (id) {
    try {
        let sql = `delete from tbl_usuario where id_usuario = ${id}`
        let result = await db.raw(sql)

        if(result && result[0].affectedRows > 0)
            return true
        else
            return false

    }catch(error){
        return false
    }
    
}

module.exports = {
    getSelectAllUsers,
    getSelectByIdUser,
    setInsertUser,
    getSelectUserByEmail,
    setUpdateUser,
    setDeleteUser
}