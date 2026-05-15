/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de clubes
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

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })


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



// GET - Retorna um clube do BD filtrando pelo id
router.get('/:id', cors(), async function (request, response) {
    let idClube = request.params.id

    //chamada da função listarClubeID validade na controller
    let dadosClube = await controllerClube.listarClubeID(idClube)

    response.status(dadosClube.status_code)
    response.json(dadosClube)
})

// Exemplo no seu arquivo de rotas
router.get('/:id', cors(), async function (request, response) {
    // Pega o ID da URL
    let idGenero = request.params.id;

    // Chama o controller
    let result = await controllerClube.listarClubesPorGenero(idGenero);

    response.status(result.status_code);
    response.json(result);
});

// POST - Insere um novo clube dentro do BD
router.post('/', cors(), upload.single('foto'), async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    if (request.file) {
        dadosBody.foto = request.file.filename
    }


    console.log(request.headers['content-type'])

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

    response.status(dadosClube.status_code)
    response.json(dadosClube)
})


// DELETE - Deleta um registro de um clube no BD
router.delete('/:id', cors(), async function (request, response) {
    let idClube = request.params.id

    //chama a função Excluir clube
    let dadosClube = await controllerClube.excluirClube(idClube)

    response.status(dadosClube.status_code)
    response.json(dadosClube)

})


module.exports = router