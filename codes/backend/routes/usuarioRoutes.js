/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de usuários 
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.1
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },

    filename: function (req, file, cb) {
        const ext = file.originalname?.split('.').pop() || 'jpg'
        cb(null, Date.now() + '.' + ext)
    }
})

const upload = multer({storage})

const router = express.Router() 
const bodyParserJson = bodyParser.json()

const controllerUsuario = require('../controller/usuario/usuario_controller.js')

// Configuração do CORS local para as rotas
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

// ENDPOINTS USUARIOS

// URL: GET http://localhost:8080/v1/conectaBook/usuarios
// GET - Retorna uma lista de usuarios do BD
router.get('/', cors(), async function(request, response){
    // Chamada da função listarUsuarios da controller
    let dadosUsuarios = await controllerUsuario.listarUsuarios()

    response.status(dadosUsuarios.status_code)
    response.json(dadosUsuarios)
})

// URL: GET http://localhost:8080/v1/conectaBook/usuarios/:id
// GET - Retorna um usuario do BD filtrando pelo ID
router.get('/:id', cors(), async function(request, response){
    let idUsuario = request.params.id

    // Chamada da função listarUsuarioID validada manualmente na controller
    let dadosUsuario = await controllerUsuario.listarUsuarioID(idUsuario)

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)
})

// URL: POST http://localhost:8080/v1/conectaBook/usuarios
// POST - Insere um novo usuário dentro do BD
router.post('/', cors(), bodyParserJson, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    // Chama a função criarUsuario enviando os dados e o content-type
    let result = await controllerUsuario.criarUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

// URL: PUT http://localhost:8080/v1/conectaBook/usuarios/:id
// PUT - Atualiza um usuário dentro do BD
router.put('/:id', cors(), upload.single('foto'), async function(request, response){
    let dadosBody = request.body
    let idUsuario = request.params.id
    let contentType = request.headers['content-type']

    let arquivo = request.file

    // Chama a função atualizarUsuario da controller
    let result = await controllerUsuario.atualizarUsuario(dadosBody, contentType, idUsuario, arquivo)

    response.status(result.status_code)
    response.json(result)
})

// URL: DELETE http://localhost:8080/v1/conectaBook/usuarios/:id
// DELETE - Deleta um registro de um usuário do BD
router.delete('/:id', cors(), async function(request, response){
    let idUsuario = request.params.id

    // Chama a função excluirUsuario da controller
    let result = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router