/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de Mensagens e Feeds
 * Projeto: ConectaBook
 * Data: 01/06/2026
 * Autor: Alex Gomes
 * Versão: 1.4
 *******************************************************************************************/

const express = require('express');
const cors = require('cors')
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer')

const mensagemController = require('../controller/mensagens/mensagem_controller.js')
const curtidasController = require('../controller/curtida/curtida_controller.js')
const jsonParser = bodyParser.json();

// Configuração do CORS local para as rotas de mensagens
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })


module.exports = function(io) {

// =========================================================================
// ENDPOINTS DE BUSCA E FEEDS (GET)
// =========================================================================

// URL: GET http://localhost:8080/v1/conectaBook/mensagem
// GET: Histórico bruto de todas as mensagens do banco
router.get('/', async function (request, response) {
    let dados = await mensagemController.listarTodasMensagens();
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/feed/principal
// GET: Timeline global da Home (posts que não pertencem a nenhum clube)
router.get('/feed/principal', async function (request, response) {
    let dados = await mensagemController.listarFeedPrincipalGeral();
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/clube/:id/mensagens
// GET: Chat contínuo/histórico completo de mensagens de um clube específico
router.get('/clube/:id/mensagens', async function (request, response) {
    let idClube = request.params.id;
    let dados = await mensagemController.listarMensagensPorClube(idClube);
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/clube/:id/mensagens/principais
// GET: Feed limpo do clube (apenas posts iniciais, sem exibir as respostas)
router.get('/clube/:id/mensagens/principais', async function (request, response) {
    let idClube = request.params.id;
    let dados = await mensagemController.listarMensagensPrincipaisPorClube(idClube);
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/:id
// GET: Busca os dados de uma única mensagem específica pelo ID
router.get('/:id', async function (request, response) {
    let idMensagem = request.params.id;
    let dados = await mensagemController.buscarMensagemPorId(idMensagem);
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/:id/respostas
// GET: Listar todas as respostas/comentários (threads) vinculadas a um post pai
router.get('/:id/respostas', async function (request, response) {
    let idMensagemPai = request.params.id;
    let dados = await mensagemController.listarRespostasDeMensagem(idMensagemPai);
    response.status(dados.status_code).json(dados);
});

// URL: GET http://localhost:8080/v1/conectaBook/mensagem/:id/curtidas
// GET: Retorna a lista de todas as curtidas que uma mensagem específica recebeu
router.get('/:id/curtidas', cors(), async function (request, response) {
    let idMensagem = request.params.id;
    let dados = await curtidasController.listarCurtidasPorMensagem(idMensagem);
    response.status(dados.status_code).json(dados);
});

// =========================================================================
// ENDPOINTS DE MANIPULAÇÃO DE CONTEÚDO (POST / PUT)
// =========================================================================

// URL: POST http://localhost:8080/v1/conectaBook/mensagem
// POST: Cria um post principal (id_clube nulo ou preenchido) ou envia uma resposta (id_mensagem_pai preenchido)
router.post('/', cors(), upload.single('arquivo'), async function (request, response) {
        let dadosBody = request.body;
        let contentType = request.headers['content-type'];

        if (request.file) {
            dadosBody.arquivo = request.file.filename;
        } else {
            dadosBody.arquivo = null;
        }

        // Passando o 'io' para emitir os eventos após salvar no banco
        let dados = await mensagemController.inserirMensagem(dadosBody, contentType, io);
        response.status(dados.status_code).json(dados);
    });

// URL: PUT http://localhost:8080/v1/conectaBook/mensagem/:id
// PUT: Edita as informações de texto (comentario) ou anexo de uma mensagem existente
router.put('/:id', cors(), upload.single('arquivo'), async function (request, response) {
    let contentType = request.headers['content-type'];
    let idMensagem = request.params.id;
    let dadosBody = request.body;

    // Se o usuário enviou um novo arquivo no upload, injetamos o nome gerado pelo Multer
    if (request.file) {
        dadosBody.arquivo = request.file.filename;
    }
    // Nota: Se request.file não existir, dadosBody.arquivo não é alterado, 
    // permitindo que o usuário atualize apenas o texto sem mexer no arquivo antigo se desejar.

    let dados = await mensagemController.atualizarMensagem(dadosBody, contentType, idMensagem);
    response.status(dados.status_code).json(dados);
});

// =========================================================================
// ENDPOINTS DE EXCLUSÃO E LIMPEZA (DELETE)
// =========================================================================

// URL: DELETE http://localhost:8080/v1/conectaBook/mensagem/:id
// DELETE: Remove uma mensagem específica, limpando em cascata as suas respostas e curtidas
router.delete('/:id', async function (request, response) {
        let idMensagem = request.params.id;

        let dados = await mensagemController.excluirMensagemComRespostas(idMensagem);
        
        // Se deletou do banco com sucesso, avisa o front-end em tempo real para sumir com o post
        if(dados.status_code === 200) {
            io.emit('mensagem_deletada', { id_mensagem: idMensagem });
        }

        response.status(dados.status_code).json(dados);
    });

// URL: DELETE http://localhost:8080/v1/conectaBook/mensagem/clube/:id
// DELETE: Limpa o histórico completo de mensagens e curtidas associadas a um clube específico
router.delete('/clube/:id', async function (request, response) {
    let idClube = request.params.id;

    let dados = await mensagemController.excluirTodasMensagensDoClube(idClube);
    response.status(dados.status_code).json(dados);
});

// URL: DELETE http://localhost:8080/v1/conectaBook/mensagem/usuario/:id
// DELETE: Apaga todas as mensagens, comentários em lote e curtidas feitas por um usuário específico
router.delete('/usuario/:id', async function (request, response) {
    let idUsuario = request.params.id;

    let dados = await mensagemController.excluirTodasMensagensDoUsuario(idUsuario);
    response.status(dados.status_code).json(dados);
});

   return router
}