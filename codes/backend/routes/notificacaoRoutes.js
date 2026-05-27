/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de notificacoes
 * Projeto: ConectaBook
 * Data: 27/05/2026
 * Autor: Geovanna Silva de Sousa
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router() 
const bodyParserJson = bodyParser.json()

const controllerNotificacao = require('../controller/notificacao/notificacao_controller.js')

// Configuração do CORS local para as rotas
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

//endpoints notificacoes

// GET - Retorna uma lista de notificacoes do bd
router.get('/', cors(), async function (request, response) {
    let dadosNotificacoes = await controllerNotificacao.listarNotificacoes()

    response.status(dadosNotificacoes.status_code)
    response.json(dadosNotificacoes)
})


//GET - retorna uma notificacao filtrando pelo id
router.get('/:id', cors(), async function (request, response) {
    let id
    
})