/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de Membros
 * Projeto: ConectaBook
 * Data: 13/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router() 
const bodyParserJson = bodyParser.json()

const controllerMembros = require('../controller/membros/membros_controller.js')

// Configuração do CORS local para as rotas
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

// ENDPOINTS MEMBROS

// GET - Retorna uma lista de todos os membros do banco
router.get('/', cors(), async function (request, response) {
    // chamada da função da controller
    let dadosMembros = await controllerMembros.listarMembros()

    response.status(dadosMembros.status_code)
    response.json(dadosMembros)
    
})

// GET - Retorna membros pelo id 
router.get('/:id', cors(), async function(request, response){
    let idMembro = request.params.id

    // chamada da função da controller
    let dadosMembros = await controllerMembros.listarMembroID(idMembro)


    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)
})



// GET - Retorna os clubes que um usuário participa
// GET - Retorna os clubes que o usuário administra
// SET - Insere um novo relacionamento
// SET - Insere um relacionamento
// SET - Atualiza um relacionamento
// SET - Deleta um relacionamento
// SET - Deleta os relacionamentos de um usuário pelo ID




module.exports = router