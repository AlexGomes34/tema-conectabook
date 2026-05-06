/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.2
 *******************************************************************************************/

// Import das dependencias
const express = require('express') 
const cors = require('cors')
const bodyParser = require('body-parser')

// Instancia na classe do express
const app = express()

// Configurações do cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

const bodyParserJson = bodyParser.json()
app.use(bodyParserJson) 

// Import do arquivo de rotas
const usuarioRoutes = require('./routes/usuarioRoutes.js')

// Configuração das rotas do usuario (URL BASE)
app.use('/v1/conectaBook/usuarios', usuarioRoutes)

// Porta (Ajustado para process.env e porta 8080 para evitar conflito com o MySQL)
const PORT = process.env.PORT || 8080

// EXECUÇÃO DO SERVIDOR
app.listen(PORT, function(){
    console.log(`Servidor rodando na porta ${PORT}...`)
})