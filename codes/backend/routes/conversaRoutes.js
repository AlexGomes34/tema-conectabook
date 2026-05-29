/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas de Conversas (tbl_conversa)
 * Projeto: ConectaBook
 * Data: 19/05/2026
 * Autor: Alex Gomes
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const conversaController = require('../controller/conversa/conversa_controller.js');
const jsonParser = bodyParser.json();

// URL: GET http://localhost:8080/v1/conectaBook/conversa
// GET: /v1/conectaBook/conversa (Lista todas)
router.get('/', async function(request, response) {
    let dados = await conversaController.listarTodasConversas();
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/conversa/:id
// GET: /v1/conectaBook/conversa/:id (Busca uma conversa pelo ID dela)
router.get('/:id', async function(request, response) {
    let idConversa = request.params.id;
    let dados = await conversaController.buscarConversaPorId(idConversa);
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/conversa/clube/:id
// GET: /v1/conectaBook/conversa/clube/:id (Busca a conversa associada a um clube)
router.get('/clube/:id', async function(request, response) {
    let idClube = request.params.id;
    let dados = await conversaController.buscarConversaPorClube(idClube);
    response.status(dados.status_code).json(dados);
});

// URL: POST http://localhost:8080/v1/conectaBook/conversa
// POST: /v1/conectaBook/conversa (Insere uma nova conversa - pode mandar id_clube ou null)
router.post('/', jsonParser, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let dados = await conversaController.inserirConversa(dadosBody, contentType);
    response.status(dados.status_code).json(dados);
});

// URL: DELETE http://localhost:8080/v1/conectaBook/conversa/:id
// DELETE: /v1/conectaBook/conversa/:id (Deleta uma conversa por ID)
router.delete('/:id', async function(request, response) {
    let idConversa = request.params.id;

    let dados = await conversaController.excluirConversa(idConversa);
    response.status(dados.status_code).json(dados);
});

module.exports = router;