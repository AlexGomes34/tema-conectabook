/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de Mensagens e Feeds
 * Projeto: ConectaBook
 * Data: 18/05/2026
 * Autor: Alex Gomes
 * Versão: 1.2
 *******************************************************************************************/

const express = require('express');
const cors = require('cors')
const router = express.Router();
const bodyParser = require('body-parser');

const mensagemController = require('../controller/mensagens/mensagem_controller.js');
const curtidasController = require('../controller/curtida/curtida_controller.js')
const jsonParser = bodyParser.json();

// O prefixo base no app.js já é: /v1/conectaBook/mensagem

// =========================================================================
// ENDPOINTS DE BUSCA E FEEDS (GET)
// =========================================================================

// URL: GET http://localhost:8080/v1/conectaBook/mensagem
// GET: /v1/conectaBook/mensagem (Histórico bruto de todas as mensagens)
router.get('/', async function(request, response) {
    let dados = await mensagemController.listarTodasMensagens(); // Corrigido de 'mensagem.' para 'mensagemController.'
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/feed/principal
// GET: /v1/conectaBook/mensagem/feed/principal (Timeline global da Home)
router.get('/feed/principal', async function(request, response) {
    let dados = await mensagemController.listarFeedPrincipalGeral();
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/clube/:id/mensagens
// GET: /v1/conectaBook/mensagem/clube/:id/mensagens (Chat contínuo do clube)
router.get('/clube/:id/mensagens', async function(request, response) {
    let idClube = request.params.id;
    let dados = await mensagemController.listarMensagensPorClube(idClube);
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/clube/:id/mensagens/principais
// GET: /v1/conectaBook/mensagem/clube/:id/mensagens/principais (Feed limpo do clube)
router.get('/clube/:id/mensagens/principais', async function(request, response) {
    let idClube = request.params.id;
    let dados = await mensagemController.listarMensagensPrincipaisPorClube(idClube);
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/:id
// GET: /v1/conectaBook/mensagem/:id (Busca uma única mensagem pelo ID)
router.get('/:id', async function(request, response) {
    let idMensagem = request.params.id;
    let dados = await mensagemController.buscarMensagemPorId(idMensagem);
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/:id/respostas
// GET: /v1/conectaBook/mensagem/:id/respostas (Respostas/threads de uma mensagem)
router.get('/:id/respostas', async function(request, response) {
    let idMensagemPai = request.params.id;
    let dados = await mensagemController.listarRespostasDeMensagem(idMensagemPai);
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/:id/curtidas
// GET - Retorna todas as curtidas de um post específico pelo ID da mensagem
router.get('/:id/curtidas', cors(), async function(request, response) {
    let idMensagem = request.params.id;

    // Chama a função da controller que acabámos de criar
    let dados = await curtidasController.listarCurtidasPorMensagem(idMensagem);

    response.status(dados.status_code).json(dados);
});

// =========================================================================
// ENDPOINTS DE MANIPULAÇÃO DE CONTEÚDO (POST / PUT)
// =========================================================================

// URL: POST http://localhost:8080/v1/conectaBook/mensagem
// POST: /v1/conectaBook/mensagem (Cria um post principal ou envia uma resposta)
router.post('/', jsonParser, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let dados = await mensagemController.inserirMensagem(dadosBody, contentType);
    response.status(dados.status_code).json(dados);
});

// URL: PUT http://localhost:8080/v1/conectaBook/mensagem/:id
// PUT: /v1/conectaBook/mensagem/:id (Edita o comentário ou arquivo de um post)
router.put('/:id', jsonParser, async function(request, response) {
    let contentType = request.headers['content-type'];
    let idMensagem = request.params.id;
    let dadosBody = request.body;

    let dados = await mensagemController.atualizarMensagem(dadosBody, contentType, idMensagem);
    response.status(dados.status_code).json(dados);
});

// =========================================================================
// ENDPOINTS DE EXCLUSÃO E LIMPEZA (DELETE)
// =========================================================================

// URL: DELETE http://localhost:8080/v1/conectaBook/mensagem/:id
// DELETE: /v1/conectaBook/mensagem/:id (Deleta mensagem, respostas e curtidas)
router.delete('/:id', async function(request, response) {
    let idMensagem = request.params.id;
    
    let dados = await mensagemController.excluirMensagemComRespostas(idMensagem);
    response.status(dados.status_code).json(dados);
});

// URL: DELETE http://localhost:8080/v1/conectaBook/mensagem/clube/:id/mensagens
// DELETE: /v1/conectaBook/mensagem/clube/:id/mensagens (Limpa o histórico do clube)
router.delete('/clube/:id/mensagens', async function(request, response) {
    let idClube = request.params.id;

    let dados = await mensagemController.excluirTodasMensagensDoClube(idClube);
    response.status(dados.status_code).json(dados);
});

// URL: DELETE http://localhost:8080/v1/conectaBook/mensagem/usuario/:id/mensagens
// DELETE: /v1/conectaBook/mensagem/usuario/:id/mensagens (Limpa posts de um usuário)
router.delete('/usuario/:id/mensagens', async function(request, response) {
    let idUsuario = request.params.id;

    let dados = await mensagemController.excluirTodasMensagensDoUsuario(idUsuario);
    response.status(dados.status_code).json(dados);
});

module.exports = router;