/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de usuários no Banco de Dados MySQL
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.1 
 *******************************************************************************************/

//CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection');

//RETORNA TODOS OS USUARIOS DO BANCO
const getSelectAllUsers = async function () {
    try {
        let sql = `select * from tbl_usuario order by id_usuario asc`
        let result = await db.raw(sql)

        // Retorna apenas a lista de dados (índice 0)
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

//INSERE UM USUARIO DENTRO DO BANCO
const setInsertUser = async function (usuario) {
    try {
        let sql = `insert into tbl_usuario (
                        nome,
                        nomeUsuario,
                        email,
                        senha,
                        data_nascimento,
                        foto_perfil
                    ) values (
                        '${usuario.nome}',
                        '${usuario.nomeUsuario}',
                        '${usuario.email}',
                        '${usuario.senha}',
                        '${usuario.dataNascimento}',
                        '${usuario.fotoPerfil}'
                    )`
        
        let result = await db.raw(sql)

        // Em inserts, o índice 0 contém informações sobre a linha inserida
        if(result && result[0].affectedRows > 0)
            return true
        else
            return false

    }catch(error){
        return false
    }
}

//ATUALIZA UM USUARIO DENTRO DO BANCO
const setUpdateUser = async function (usuario) {
    try {
        let sql = `update tbl_usuario set 
                        nome = '${usuario.nome}',
                        nomeUsuario = '${usuario.nomeUsuario}',
                        email = '${usuario.email}',
                        senha = '${usuario.senha}',
                        data_nascimento = '${usuario.dataNascimento}',
                        foto_perfil = '${usuario.fotoPerfil}'
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
    setUpdateUser,
    setDeleteUser
}