/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Alex Henrique Da Cruz Gomes / Geovanna Silva
 * Versão: 1.2
 *******************************************************************************************/

const express = require('express') 
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// Configuração global do CORS - Mais limpo e funcional

app.use('/uploads', express.static('uploads'))

app.use(cors())

// Middleware para JSON
app.use(bodyParser.json()) 

const usuarioRoutes = require('./routes/usuarioRoutes.js')
app.use('/v1/conectaBook/usuarios', usuarioRoutes)

const generoRoutes = require('./routes/generoRoutes.js')
app.use('/v1/conectaBook/generos', generoRoutes)

const generoUsuarioRoutes = require('./routes/genero_usuarioRoutes.js')
app.use('/v1/conectaBook/genero-usuario', generoUsuarioRoutes)

const generoLivroRoutes = require('./routes/genero_livroRoutes.js')
app.use('/v1/conectaBook/genero-livro', generoLivroRoutes)

const authRoutes = require('./routes/auth_routes.js')
app.use('/v1/conectaBook/auth', authRoutes)

const clubeRoutes = require('./routes/clubeRoutes.js')
app.use('/v1/conectaBook/clubes', clubeRoutes)

const cafeteriaRoutes = require('./routes/cafeteriaRoutes.js')
app.use('/v1/conectaBook/cafeterias', cafeteriaRoutes)

const membrosRoutes = require('./routes/membrosRoutes.js')
app.use('/v1/conectaBook/membros', membrosRoutes)

const livrosRoutes = require('./routes/livroRoutes.js')
app.use('/v1/conectaBook/livros', livrosRoutes)

const acessoLivroRoutes = require('./routes/acessoRoutes.js')
app.use('/v1/conectaBook/livro-acesso', acessoLivroRoutes)

const mensagemRoutes = require('./routes/mensagemRoutes.js')
app.use('/v1/conectaBook/mensagem', mensagemRoutes)

const conversaRoutes = require('./routes/conversaRoutes.js')
app.use('/v1/conectaBook/conversa', conversaRoutes);

const curtidasRoutes = require('./routes/curtidaRoutes.js')
app.use('/v1/conectaBook/curtida', curtidasRoutes)

const avaliacaoRoutes = require('./routes/avaliacaoRoutes.js')
app.use('/v1/conectaBook/avaliacao', avaliacaoRoutes);

const avaliacaoLivroRoutes = require('./routes/avaliacao_livroRoutes.js')
app.use('/v1/conectaBook/avaliacao-livro', avaliacaoLivroRoutes);

const avaliacaoCafeteriaRoutes = require('./routes/avaliacao_cafeteriaRoutes.js')
app.use('/v1/conectaBook/avaliacao-cafeteria', avaliacaoCafeteriaRoutes);

const PORT = process.env.PORT || 8080

app.listen(PORT, function(){
    console.log(`Servidor rodando na porta ${PORT}...`)
})
