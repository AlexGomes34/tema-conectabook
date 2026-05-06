/*******************************************************************************************
 * Objetivo: Arquivo de configuração do DB do projeto
 * Data: 05/05/2026
 * Autor: Alex Henrique da Cruz Gomes
 * Versão: 1.0
 ******************************************************************************************/

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: "localhost",
            user: "root",
            password: "SUA_SENHA",
            database: "db_conecta_book",
            port: 3306,
            charset: 'utf8mb4'
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./database/migrations", 
        }
    }
};
