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
    let idNotificacao = request.params.id

    let dadosNotificacoes = await controllerNotificacao.listarNotificacaoId(idNotificacao)

    response.status(dadosNotificacoes.status_code)
    response.json(dadosNotificacoes)
    
})

// GET - Retorna uma notificação pelo id do usuário
router.get('/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosNotificacoes = await controllerNotificacao.listarNotificacoesIdUsuario(idUsuario)

    response.status(dadosNotificacoes.status_code)
    response.json(dadosNotificacoes)
    
})

// PUT -  Atualiza uma notificação no BD
router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body
    let idNotificacao = request.params.id
    let contentType = request.headers['content-type']

    let dadosNotificacoes = await controllerNotificacao.atualizarNotificacao(idNotificacao)

    response.status(dadosNotificacoes.status_code)
    response.json(dadosNotificacoes)
})


//DELETE - Delta um registro de uma notificação no BD
router.delete('/:id', cors(), async function (request, response) {

    let idNotificacao = await controllerNotificacao.excluirNotificacao(idNotificacao)

    let dadosNotificacoes = await controllerNotificacao.excluirNotificacao(idNotificacao)

     response.status(dadosNotificacoes.status_code)
    response.json(dadosNotificacoes)
    
})

module.exports = router