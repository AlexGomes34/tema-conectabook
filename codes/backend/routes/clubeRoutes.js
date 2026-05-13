/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de generos_usuarios
 * Projeto: ConectaBook
 * Data: 13/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1
 *******************************************************************************************/

const express = require('express')
const router = express.Router()
const controllerClube = require('../controller/clube/clube_controller.js')
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bodyParserJson = bodyParser.json()


//Configuração do CORS para as rotas
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

//GET - Retorna uma lista de clubes do BD
router.get('/', cors(), async function (request, response) {
    // Chamada da função listarCLubes da controller
    let dadosClube = await controllerClube.listarClubes()

    console.log(dadosClube)
    response.status(dadosClube.status_code)
    response.json(dadosClube)
    
})



// GET - Retorna um clube do BD diltrabdo pelo id
router.get('/:id', cors(), async function (request, response) {
        let idClube = request.params.id
        
        //chamada da função listarClubeID validade na controller
        let dadosClube = await controllerClube.listarClubeID(idClube)

        response.status(dadosClube.status_code)
        response.json(dadosClube)
})


// POST - Insere um novo gênero dentro do BD
router.post('/', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    // Chama a função criarClube enviando os dados e o content-type
    let dadosClube = await controllerClube.criarClube(dadosBody, contentType)

    response.status(dadosClube.status_code)
    response.json(dadosClube)
    
})


// PUT - Atualiza um clube dentro do BD
router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body
    let idClube = request.params.id
    let contentType = request.headers['content-type']

    // Chama a função atualizar clube 
    let dadosClube = await controllerClube.atualizarClube(dadosBody, contentType, idClube)

    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
})


// DELETE - Deleta um registro de um clube no BD
router.delete('/:id', cors(), async function (request, response) {
    let idClube = request.params.id

    //chama a função Excluir clube
    let dadosClube = await controllerClube.excluirClube(idClube)

    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
    
})


module.exports = router