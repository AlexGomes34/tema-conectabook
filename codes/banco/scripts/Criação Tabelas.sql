CREATE TABLE tbl_usuario (
id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nome varchar(100) NOT NULL,
nome_usuario varchar(100) NOT NULL,
genero_favorito varchar(50) NOT NULL,
email varchar(100) NOT NULL,
senha varchar(100) NOT NULL,
data_nascimento varchar(10) NOT NULL,
foto_perfil TEXT NULL
);

CREATE TABLE tbl_status (
id_status INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nome_status varchar(20) NOT NULL
);

CREATE TABLE tbl_categoria (
id_categoria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nome varchar(30) NOT NULL,
descricao varchar(100) NOT NULL
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
id_usuario INT NULL,
FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_post_feed (
id_post_feed INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
mensagem varchar(300) NOT NULL,
arquivo_externo TEXT NULL,
data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
id_usuario INT NULL,
FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_comentario_feed (
id_comentario_feed INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
mensagem varchar(300) NOT NULL,
data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
id_usuario INT NULL,
FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
id_post_feed INT NOT NULL,
FOREIGN KEY (id_post_feed) REFERENCES tbl_post_feed(id_post_feed)
);

CREATE TABLE tbl_post_clube (
id_post_clube INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
mensagem varchar(300) NOT NULL,
arquivo_externo TEXT NULL,
data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
id_usuario INT NULL,
FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_comentario_clube (
id_comentario_clube INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
mensagem varchar(300) NOT NULL,
id_usuario INT NULL,
FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
id_post_clube INT NOT NULL,
FOREIGN KEY (id_post_clube) REFERENCES tbl_post_clube(id_post_clube)
);

CREATE TABLE tbl_livro (
id_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
titulo varchar(50) NOT NULL,
autor varchar(50) NOT NULL,
descricao varchar(300) NULL,
id_categoria INT NOT NULL,
FOREIGN KEY (id_categoria) REFERENCES tbl_categoria (id_categoria)
);

CREATE TABLE tbl_cafeteria (
id_cafeteria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nome varchar(100) NOT NULL,
endereco TEXT NOT NULL,
horario_funcionamento varchar(100) NOT NULL,
rede_social TEXT NULL
);

CREATE TABLE tbl_avaliacao (
id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
estrelas INT NOT NULL,
mensagem TEXT NULL,
id_usuario INT NOT NULL,
FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
id_livro INT NULL,
FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro),
id_cafeteria INT NULL,
FOREIGN KEY (id_cafeteria) REFERENCES tbl_cafeteria (id_cafeteria)
);

CREATE TABLE tbl_membros (
id_membros INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
administrador BOOLEAN DEFAULT FALSE,
id_usuario INT NULL,
FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_clube (
id_clube INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nome varchar(100) NOT NULL,
sobre TEXT NOT NULL,
regras TEXT NOT NULL,
genero varchar(30) NOT NULL,
foto TEXT NOT NULL,
numero_membros INT NULL,
id_membros INT NOT NULL,
FOREIGN KEY (id_membros) REFERENCES tbl_membros (id_membros)
);

CREATE TABLE tbl_estante (
id_estante INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_usuario INT NOT NULL,
FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
id_status INT NOT NULL,
FOREIGN KEY (id_status) REFERENCES tbl_status (id_status),
id_livro INT NOT NULL,
FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro)
);

CREATE TABLE tbl_curtida (
id_curtida INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_usuario INT NOT NULL,
FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
id_post_clube INT NULL,
FOREIGN KEY (id_post_clube) REFERENCES tbl_post_clube (id_post_clube),
id_post_feed INT NULL,
FOREIGN KEY (id_post_feed) REFERENCES tbl_post_feed (id_post_feed)
);
