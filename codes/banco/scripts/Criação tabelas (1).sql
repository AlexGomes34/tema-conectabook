-- DROP DATABASE db_conecta_book;
-- CREATE DATABASE db_conecta_book;

CREATE TABLE tbl_status_livro (
	id_status_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome_status varchar(20) NOT NULL
);

CREATE TABLE tbl_genero (
	id_genero INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome varchar(30) NOT NULL,
	descricao varchar(100) NULL
);

CREATE TABLE tbl_usuario (
	id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome varchar(100) NOT NULL,
	nome_usuario varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	senha varchar(100) NOT NULL,
	data_nascimento varchar(10) NOT NULL,
	foto_perfil TEXT NULL
);

CREATE TABLE tbl_evento (
	id_evento INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome varchar(100) NOT NULL,
	data_evento varchar(50) NOT NULL,
	local_evento varchar(100) NOT NULL,
	endereco varchar(200) NOT NULL,
	funcionamento varchar(100) NOT NULL
);

CREATE TABLE tbl_notificacao (
	id_notificacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	titulo varchar(50) NOT NULL,
	mensagem varchar(100) NOT NULL,
	data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	data_recebimento TIMESTAMP NULL,
	id_usuario INT NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_livro (
	id_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	titulo varchar(50) NOT NULL,
    isbn varchar(20) NOT NULL,
	autor varchar(50) NOT NULL,
	descricao varchar(300) NOT NULL,
    capa TEXT NOT NULL
);

CREATE TABLE tbl_acesso_livro (
	id_acesso_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_livro INT NOT NULL,
    FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro),
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
	data_acesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE tbl_cafeteria (
	id_cafeteria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome varchar(100) NOT NULL,
	endereco TEXT NOT NULL,
	horario_funcionamento varchar(100) NOT NULL,
	rede_social TEXT NULL,
    foto TEXT NOT NULL
);

CREATE TABLE tbl_avaliacao (
	id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	estrelas INT NOT NULL,
	mensagem TEXT NULL,
	id_usuario INT NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
	data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE tbl_clube (
	id_clube INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome varchar(100) NOT NULL,
	sobre TEXT NOT NULL,
	regras TEXT NOT NULL,
	foto TEXT NULL,
    id_genero INT NOT NULL,
	FOREIGN KEY (id_genero) REFERENCES tbl_genero (id_genero),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL
);

CREATE TABLE tbl_membros (
	id_membros INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	administrador BOOLEAN DEFAULT FALSE,
	id_usuario INT NULL,	
	FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
    id_clube INT NOT NULL,
	FOREIGN KEY (id_clube) REFERENCES tbl_clube (id_clube)
);

delete from tbl_clube where id_clube = 1;
delete from tbl_membros where id_clube = 2;

CREATE TABLE tbl_estante (
	id_estante INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_usuario INT NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
	id_status_livro INT NOT NULL,
	FOREIGN KEY (id_status_livro) REFERENCES tbl_status_livro (id_status_livro),
	id_livro INT NOT NULL,
	FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro),
	data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE tbl_status (
	id_status INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL
);

CREATE TABLE tbl_modulo (
	id_modulo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL
);

CREATE TABLE tbl_mensagem (
	id_mensagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	mensagem varchar(300) NOT NULL,
	arquivo_externo TEXT NULL,
	data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	id_usuario INT NULL,
	FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
	id_status INT NOT NULL,
	FOREIGN KEY (id_status) REFERENCES tbl_status (id_status)
);

CREATE TABLE tbl_conversa (
	id_conversa INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_mensagem_post INT NOT NULL,
	FOREIGN KEY (id_mensagem_post) REFERENCES tbl_mensagem (id_mensagem),
	id_mensagem_resposta INT NOT NULL,
	FOREIGN KEY (id_mensagem_resposta) REFERENCES tbl_mensagem (id_mensagem),
	id_modulo INT NOT NULL,
	FOREIGN KEY (id_modulo) REFERENCES tbl_modulo (id_modulo)
);

CREATE TABLE tbl_curtida (
	id_curtida INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_usuario INT NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
    id_conversa INT NOT NULL,
    FOREIGN KEY (id_conversa) REFERENCES tbl_conversa (id_conversa)
);

CREATE TABLE tbl_avaliacao_livro (
	id_avaliacao_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_avaliacao INT NOT NULL,
    FOREIGN KEY (id_avaliacao) REFERENCES tbl_avaliacao (id_avaliacao),
    id_livro INT NOT NULL,
    FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro)
);


CREATE TABLE tbl_avaliacao_cafeteria (
	id_avaliacao_cafeteria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_avaliacao INT NOT NULL,
    FOREIGN KEY (id_avaliacao) REFERENCES tbl_avaliacao (id_avaliacao),
    id_cafeteria INT NOT NULL,
    FOREIGN KEY (id_cafeteria) REFERENCES tbl_cafeteria (id_cafeteria)
);

CREATE TABLE tbl_genero_usuario (
	id_genero_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_genero INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES tbl_genero (id_genero),
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_genero_livro (
	id_genero_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_genero INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES tbl_genero (id_genero),
    id_livro INT NOT NULL,
    FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro)
);
