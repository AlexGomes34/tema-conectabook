-- =========================================
-- DATABASE
-- =========================================
DROP DATABASE IF EXISTS db_conecta_book;

CREATE DATABASE db_conecta_book;
USE db_conecta_book;

-- =========================================
-- TABELAS BASE
-- =========================================

CREATE TABLE tbl_status_livro (
    id_status_livro INT PRIMARY KEY AUTO_INCREMENT,
    nome_status VARCHAR(20) NOT NULL
);

CREATE TABLE tbl_genero (
    id_genero INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    descricao VARCHAR(100) NULL
);

CREATE TABLE tbl_usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    foto_perfil TEXT NULL
);

CREATE TABLE tbl_evento (
    id_evento INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_evento DATETIME NOT NULL,
    local_evento VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    funcionamento VARCHAR(100) NOT NULL
);

CREATE TABLE tbl_livro (
    id_livro INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    autor VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    capa TEXT NOT NULL
);

CREATE TABLE tbl_cafeteria (
    id_cafeteria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    endereco TEXT NOT NULL,
    horario_funcionamento VARCHAR(100) NOT NULL,
    rede_social TEXT NULL,
    foto TEXT NOT NULL
);

-- =========================================
-- TABELAS COM DEPENDÊNCIAS DIRETAS
-- =========================================

CREATE TABLE tbl_notificacao (
    id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    mensagem VARCHAR(255) NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_recebimento TIMESTAMP NULL,

    id_usuario INT NOT NULL,

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario)
    ON DELETE CASCADE
);

CREATE TABLE tbl_acesso_livro (
    id_acesso_livro INT PRIMARY KEY AUTO_INCREMENT,
    data_acesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    id_livro INT NOT NULL,
    id_usuario INT NOT NULL,

    FOREIGN KEY (id_livro)
    REFERENCES tbl_livro(id_livro)
    ON DELETE CASCADE,

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario)
    ON DELETE CASCADE
);

CREATE TABLE tbl_avaliacao (
    id_avaliacao INT PRIMARY KEY AUTO_INCREMENT,
    estrelas INT NOT NULL,
    mensagem TEXT NULL,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    id_usuario INT NOT NULL,

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario)
    ON DELETE CASCADE
);

CREATE TABLE tbl_clube (
    id_clube INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobre TEXT NOT NULL,
    regras TEXT NOT NULL,
    foto TEXT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    id_genero INT NOT NULL,

    FOREIGN KEY (id_genero)
    REFERENCES tbl_genero(id_genero)
);

-- =========================================
-- TABELAS DEPENDENTES
-- =========================================

CREATE TABLE tbl_membro (
    id_membro INT PRIMARY KEY AUTO_INCREMENT,
    administrador BOOLEAN DEFAULT FALSE,

    id_usuario INT NOT NULL,
    id_clube INT NOT NULL,

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario)
    ON DELETE CASCADE,

    FOREIGN KEY (id_clube)
    REFERENCES tbl_clube(id_clube)
    ON DELETE CASCADE,

    UNIQUE (id_usuario, id_clube)
);

CREATE TABLE tbl_estante (
    id_estante INT PRIMARY KEY AUTO_INCREMENT,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    id_usuario INT NOT NULL,
    id_status_livro INT NOT NULL,
    id_livro INT NOT NULL,

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario)
    ON DELETE CASCADE,

    FOREIGN KEY (id_status_livro)
    REFERENCES tbl_status_livro(id_status_livro),

    FOREIGN KEY (id_livro)
    REFERENCES tbl_livro(id_livro)
    ON DELETE CASCADE,

    UNIQUE (id_usuario, id_livro)
);

CREATE TABLE tbl_conversa (
    id_conversa INT PRIMARY KEY AUTO_INCREMENT,

    id_clube INT NOT NULL,

    FOREIGN KEY (id_clube)
    REFERENCES tbl_clube(id_clube)
    ON DELETE CASCADE
);

CREATE TABLE tbl_mensagem (
    id_mensagem INT PRIMARY KEY AUTO_INCREMENT,
    comentario TEXT NOT NULL,
    arquivo TEXT NULL,
    data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    id_usuario INT NOT NULL,
    id_mensagem_pai INT NULL,
    id_conversa INT NOT NULL,

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario)
    ON DELETE CASCADE,

    FOREIGN KEY (id_conversa)
    REFERENCES tbl_conversa(id_conversa)
    ON DELETE CASCADE,

    FOREIGN KEY (id_mensagem_pai)
    REFERENCES tbl_mensagem(id_mensagem)
    ON DELETE CASCADE
);

CREATE TABLE tbl_curtida (
    id_curtida INT PRIMARY KEY AUTO_INCREMENT,

    id_usuario INT NOT NULL,
    id_mensagem INT NOT NULL,

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario)
    ON DELETE CASCADE,

    FOREIGN KEY (id_mensagem)
    REFERENCES tbl_mensagem(id_mensagem)
    ON DELETE CASCADE,

    UNIQUE (id_usuario, id_mensagem)
);

-- =========================================
-- TABELAS MUITOS-PARA-MUITOS
-- =========================================

CREATE TABLE tbl_avaliacao_livro (
    id_avaliacao_livro INT PRIMARY KEY AUTO_INCREMENT,

    id_avaliacao INT NOT NULL,
    id_livro INT NOT NULL,

    FOREIGN KEY (id_avaliacao)
    REFERENCES tbl_avaliacao(id_avaliacao)
    ON DELETE CASCADE,

    FOREIGN KEY (id_livro)
    REFERENCES tbl_livro(id_livro)
    ON DELETE CASCADE
);

CREATE TABLE tbl_avaliacao_cafeteria (
    id_avaliacao_cafeteria INT PRIMARY KEY AUTO_INCREMENT,

    id_avaliacao INT NOT NULL,
    id_cafeteria INT NOT NULL,

    FOREIGN KEY (id_avaliacao)
    REFERENCES tbl_avaliacao(id_avaliacao)
    ON DELETE CASCADE,

    FOREIGN KEY (id_cafeteria)
    REFERENCES tbl_cafeteria(id_cafeteria)
    ON DELETE CASCADE
);

CREATE TABLE tbl_genero_usuario (
    id_genero_usuario INT PRIMARY KEY AUTO_INCREMENT,

    id_genero INT NOT NULL,
    id_usuario INT NOT NULL,

    FOREIGN KEY (id_genero)
    REFERENCES tbl_genero(id_genero)
    ON DELETE CASCADE,

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario)
    ON DELETE CASCADE
);

CREATE TABLE tbl_genero_livro (
    id_genero_livro INT PRIMARY KEY AUTO_INCREMENT,

    id_genero INT NOT NULL,
    id_livro INT NOT NULL,

    FOREIGN KEY (id_genero)
    REFERENCES tbl_genero(id_genero)
    ON DELETE CASCADE,

    FOREIGN KEY (id_livro)
    REFERENCES tbl_livro(id_livro)
    ON DELETE CASCADE
);

-- =========================================
-- INSERTS BASE
-- =========================================

INSERT INTO tbl_status_livro (nome_status) VALUES
('Quero Ler'),
('Lendo'),
('Lido'),
('Abandonado');

INSERT INTO tbl_genero (nome) VALUES
('Romance'),
('Fantasia'),
('Ficção Científica'),
('Terror'),
('Suspense'),
('Mistério'),
('Aventura'),
('Drama'),
('Comédia'),
('Ação'),
('Biografia'),
('História'),
('Poesia'),
('Infantil'),
('Juvenil'),
('Distopia'),
('HQ'),
('Mangá'),
('Autoajuda'),
('Religioso'),
('Técnico'),
('Educação'),
('Filosofia'),
('Psicologia'),
('Policial');

INSERT INTO tbl_usuario
(nome, nome_usuario, email, senha, data_nascimento, foto_perfil)
VALUES
('Alex Henrique', 'alex_henrique', 'alex@email.com', 'senha123', '2004-10-15', 'https://linkdafoto.com/alex.jpg'),

('Geovanna Silva', 'geovanna_silva', 'geovanna@email.com', 'senha456', '2005-03-22', 'https://linkdafoto.com/geo.jpg'),

('Carlos Eduardo', 'cadu_leitor', 'carlos@email.com', 'senha789', '2001-07-05', NULL);

INSERT INTO tbl_evento
(nome, data_evento, local_evento, endereco, funcionamento)
VALUES
(
'Feira Literária de São Paulo',
'2026-07-25 10:00:00',
'Expo Center Norte',
'Rua José Bernardo Pinto, 333',
'Das 10h às 22h'
),

(
'Clube do Livro: Especial Terror',
'2026-10-31 19:00:00',
'Biblioteca Municipal',
'Av. Paulista, 1500',
'Às 19h00'
);

INSERT INTO tbl_livro
(titulo, isbn, autor, descricao, capa)
VALUES
(
'Duna',
'9788551002490',
'Frank Herbert',
'Uma jornada épica no planeta desértico de Arrakis.',
'https://capas.com/duna.jpg'
),

(
'O Iluminado',
'9788560280421',
'Stephen King',
'O drama psicológico de Jack Torrance no isolado Hotel Overlook.',
'https://capas.com/iluminado.jpg'
),

(
'Orgulho e Preconceito',
'9788582850350',
'Jane Austen',
'O clássico confronto entre Elizabeth Bennet e o Sr. Darcy.',
'https://capas.com/orgulho.jpg'
);

INSERT INTO tbl_cafeteria
(nome, endereco, horario_funcionamento, rede_social, foto)
VALUES
(
'Café & Poesia',
'Praça da Sé, 45 - Centro',
'Segunda a Sábado, das 08h às 20h',
'@cafe_e_poesia',
'https://fotos.com/cafeteria1.jpg'
),

(
'Literato Coffee',
'Alameda Santos, 1200 - Paulista',
'Todos os dias, das 09h às 22h',
'@literatocoffee',
'https://fotos.com/cafeteria2.jpg'
);

-- =========================================
-- INSERTS DEPENDENTES
-- =========================================

INSERT INTO tbl_notificacao
(titulo, mensagem, id_usuario)
VALUES
(
'Bem-vindo!',
'Obrigado por criar sua conta no ConectaBook.',
1
),

(
'Novo Clube!',
'Um clube de Fantasia que você segue acabou de ser criado.',
2
);

INSERT INTO tbl_acesso_livro
(id_livro, id_usuario)
VALUES
(1,1),
(2,1),
(3,2);

INSERT INTO tbl_avaliacao
(estrelas, mensagem, id_usuario)
VALUES
(
5,
'Obra-prima da ficção científica, todo mundo deveria ler!',
1
),

(
4,
'Muito assustador, o King sabe construir tensão.',
2
),

(
5,
'Ambiente maravilhoso para ler um bom livro enquanto toma um expresso.',
1
);

INSERT INTO tbl_clube
(nome, sobre, regras, foto, id_genero)
VALUES
(
'Viajantes de Arrakis',
'Clube focado em leitura de ficção científica clássica e moderna.',
'Respeitar opiniões e evitar spoilers sem aviso.',
NULL,
3
),

(
'Leitores da Madrugada',
'Para quem gosta de histórias assustadoras.',
'Proibido conteúdo ofensivo.',
NULL,
4
);

INSERT INTO tbl_membro
(administrador, id_usuario, id_clube)
VALUES
(1,1,1),
(0,2,1),
(1,2,2);

INSERT INTO tbl_estante
(id_usuario, id_status_livro, id_livro)
VALUES
(1,3,1),
(1,2,2),
(2,1,3);

INSERT INTO tbl_conversa (id_clube)
VALUES
(1),
(2);

-- =========================================
-- MENSAGENS
-- =========================================

INSERT INTO tbl_mensagem
(comentario, arquivo, id_usuario, id_mensagem_pai, id_conversa)
VALUES
(
'E aí pessoal, o que estão achando do primeiro capítulo de Duna?',
NULL,
1,
NULL,
1
);

INSERT INTO tbl_mensagem
(comentario, arquivo, id_usuario, id_mensagem_pai, id_conversa)
VALUES
(
'Eu achei o começo um pouco lento, mas o universo é incrível!',
NULL,
2,
1,
1
);

INSERT INTO tbl_mensagem
(comentario, arquivo, id_usuario, id_mensagem_pai, id_conversa)
VALUES
(
'Alguém já terminou o livro do mês?',
NULL,
3,
NULL,
2
);

INSERT INTO tbl_curtida
(id_usuario, id_mensagem)
VALUES
(2,1),
(1,2);

-- =========================================
-- RELACIONAMENTOS M:N
-- =========================================

INSERT INTO tbl_avaliacao_livro
(id_avaliacao, id_livro)
VALUES
(1,1),
(2,2);

INSERT INTO tbl_avaliacao_cafeteria
(id_avaliacao, id_cafeteria)
VALUES
(3,1);

INSERT INTO tbl_genero_usuario
(id_genero, id_usuario)
VALUES
(3,1), -- Ficção Científica
(2,1), -- Fantasia
(4,2); -- Terror

INSERT INTO tbl_genero_livro
(id_genero, id_livro)
VALUES
(3,1), -- Duna = Ficção Científica
(4,2), -- O Iluminado = Terror
(1,3); -- Orgulho e Preconceito = Romance

RENAME TABLE tbl_membro TO tbl_membros;
