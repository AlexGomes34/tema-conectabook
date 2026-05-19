/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de autenticação
 * Projeto: ConectaBook
 * Data: 07/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express');
const router = express.Router();
const authController = require('../controller/auth/auth_controller.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Rota para realizar o login
router.post('/login', jsonParser, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let result = await authController.validarLogin(dadosBody, contentType)

    if (!result || !result.status_code) {
        return response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno: A controller de autenticação não retornou uma resposta válida."
        })
    }

    response.status(result.status_code).json(result);
});

module.exports = router;