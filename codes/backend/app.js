/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Alex Henrique Da Cruz Gomes
 * Versão: 1.2
 *******************************************************************************************/

const express = require('express') 
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// Configuração global do CORS - Mais limpo e funcional
app.use(cors())

// Middleware para JSON
app.use(bodyParser.json()) 

const usuarioRoutes = require('./routes/usuarioRoutes.js')
app.use('/v1/conectaBook/usuarios', usuarioRoutes)

const generoRoutes = require('./routes/generoRoutes.js')
app.use('/v1/conectaBook/generos', generoRoutes)

const generoUsuarioRoutes = require('./routes/genero_usuarioRoutes.js')
app.use('/v1/conectaBook/genero-usuario', generoUsuarioRoutes)

const authRoutes = require('./routes/auth_routes.js')
app.use('/v1/conectaBook/auth', authRoutes)

const clubeRoutes = require('./routes/clubeRoutes.js')
app.use('/v1/conectaBook/clubes', clubeRoutes)

const membrosRoutes = require('./routes/membrosRoutes.js')
app.use('/v1/conectabook/membros', membrosRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, function(){
    console.log(`Servidor rodando na porta ${PORT}...`)
})
