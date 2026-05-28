/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realizacão das rotas de Curtidas
 * Projeto: ConectaBook
 * Data: 26/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router() 
const bodyParserJson = bodyParser.json()

const controllerCurtida  = require('../controller/curtida/curtida_controller')


// Configuração do CORS local para as rotas
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

// ENDPOINTS Curtidas

// GET - Retorna uma lista de curtidas do BD
router.get('/', cors(), async function(request, response){
    // Chamada da função listarCafeterias da controller
    let dadosCurtidas = await controllerCurtida.listarTodasCurtidas()

    console.log(dadosCurtidas)
    response.status(dadosCurtidas.status_code)
    response.json(dadosCurtidas)
})