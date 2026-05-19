/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de autenticação
 * Projeto: ConectaBook
 * Data: 07/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const router = express.Router()
const authController = require('../controller/auth/auth_controller.js')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// Rota para realizar o login
router.post('/login', jsonParser, async function(request, response) {
    // Pegamos o Content-Type e o corpo da requisição
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    // Chama a controller que agora valida senha e gera o Token
    let result = await authController.validarLogin(dadosBody, contentType);

    // Verificação de segurança caso a controller falhe
    if (result) {
        return response.status(result.status_code).json(result);
    } else {
        return response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor de autenticação."
        })
    }
})

module.exports = router;




/*
const jwtService = require('../../jwt/jwt_service.js'); // Importe seu serviço de JWT

// Rota que exige estar logado (ex: ver perfil)
router.get('/perfil', jwtService.verificarToken, async function(request, response) {
    // Se chegou aqui, o 'verificarToken' já validou o usuário!
    // O ID do usuário logado está em: request.user.id
    response.status(200).json({
        message: "Acesso autorizado!",
        usuario_logado: request.user
    });
});
*/