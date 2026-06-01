/*******************************************************************************************
 * Objetivo: Arquivo responsável pela maipulação do socket.io (Interação em tempo real)
 * Projeto: ConectaBook
 * Data: 26/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.0
 *******************************************************************************************/

const socketIo = require('socket.io')

let io

const setupSocket = (server) => {
    io = socketIo(server, {
        cors: { origin: "*" } 
    })

    io.on('connection', (socket) => {
        console.log(` Usuário conectado: ${socket.id}`)

        // O Front-end deve enviar o id_conversa ao abrir um chat
        socket.on('join_chat', (idConversa) => {
            socket.join(`chat_${idConversa}`)
            console.log(`Usuário entrou na sala: chat_${idConversa}`)
        });

        // Sala para notificações (cada usuário entra na sua própria sala baseada no ID)
        socket.on('join_notifications', (idUsuario) => {
            socket.join(`user_${idUsuario}`)
        });

        socket.on('disconnect', () => {
            console.log('Usuário desconectado')
        });
    });

    return io
};

const getIo = () => {
    if (!io) throw new Error("Socket não inicializado")
    return io;
};

module.exports = { setupSocket, getIo }