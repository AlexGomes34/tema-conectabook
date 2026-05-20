-- DROP database db_conecta_book;
CREATE database db_conecta_book;
use db_conecta_book;

CREATE TABLE tbl_status_livro (
    id_status_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome_status VARCHAR(20) NOT NULL
);

CREATE TABLE tbl_genero (
    id_genero INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    descricao VARCHAR(100) NULL
);

CREATE TABLE tbl_usuario (
    id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    data_nascimento VARCHAR(10) NOT NULL,
    foto_perfil TEXT NULL
);

CREATE TABLE tbl_evento (
    id_evento INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_evento VARCHAR(50) NOT NULL,
    local_evento VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    funcionamento VARCHAR(100) NOT NULL
);

CREATE TABLE tbl_livro (
    id_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    autor VARCHAR(50) NOT NULL,
    descricao VARCHAR(300) NOT NULL,
    capa TEXT NOT NULL
);

CREATE TABLE tbl_cafeteria (
    id_cafeteria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    endereco TEXT NOT NULL,
    horario_funcionamento VARCHAR(100) NOT NULL,
    rede_social TEXT NULL,
    foto TEXT NOT NULL
);

-- 2. TABELAS COM DEPENDÊNCIAS DIRETAS (NÍVEL 1)
CREATE TABLE tbl_notificacao (
    id_notificacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    mensagem VARCHAR(100) NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_recebimento TIMESTAMP NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_acesso_livro (
    id_acesso_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_livro INT NOT NULL,
    id_usuario INT NOT NULL,
    data_acesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro),
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_avaliacao (
    id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    estrelas INT NOT NULL,
    mensagem TEXT NULL,
    id_usuario INT NOT NULL,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_clube (
    id_clube INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobre TEXT NOT NULL,
    regras TEXT NOT NULL,
    foto TEXT NULL,
    id_genero INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL,
    FOREIGN KEY (id_genero) REFERENCES tbl_genero (id_genero)
);

-- 3. TABELAS DEPENDENTES DE CLUBES E HISTÓRICO (NÍVEL 2)
CREATE TABLE tbl_membros (
    id_membros INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    administrador BOOLEAN DEFAULT FALSE,
    id_usuario INT NULL,    
    id_clube INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
    FOREIGN KEY (id_clube) REFERENCES tbl_clube (id_clube)
);

CREATE TABLE tbl_estante (
    id_estante INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_status_livro INT NOT NULL,
    id_livro INT NOT NULL,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
    FOREIGN KEY (id_status_livro) REFERENCES tbl_status_livro (id_status_livro),
    FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro)
);

-- AJUSTADO: tbl_conversa agora pertence a um clube
CREATE TABLE tbl_conversa (
    id_conversa INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_clube INT NULL,
    FOREIGN KEY (id_clube) REFERENCES tbl_clube (id_clube)
);

-- AJUSTADO: tbl_mensagem com os campos e relacionamentos corretos do novo modelo
CREATE TABLE tbl_mensagem (
    id_mensagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    comentario TEXT NOT NULL,                 -- Conforme o diagrama (antigo 'mensagem')
    arquivo TEXT NULL,                        -- Conforme o diagrama (antigo 'arquivo_externo')
    data_postagem TIMESTAMP DEFAULT NULL,     -- Conforme o diagrama (pode aceitar NULL)
    id_usuario INT NOT NULL,
    id_mensagem_pai INT NULL,                 -- Auto-relacionamento (resposta)
    id_conversa INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
    FOREIGN KEY (id_conversa) REFERENCES tbl_conversa (id_conversa),
    FOREIGN KEY (id_mensagem_pai) REFERENCES tbl_mensagem (id_mensagem)
);

-- AJUSTADO: tbl_curtida agora aponta para mensagens, não para conversas
CREATE TABLE tbl_curtida (
    id_curtida INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_usuario INT NULL,
    id_mensagem INT NULL,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
    FOREIGN KEY (id_mensagem) REFERENCES tbl_mensagem (id_mensagem)
);

-- 4. TABELAS DE RELACIONAMENTO MUITOS-PARA-MUITOS (NÍVEL 3)
CREATE TABLE tbl_avaliacao_livro (
    id_avaliacao_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_avaliacao INT NOT NULL,
    id_livro INT NOT NULL,
    FOREIGN KEY (id_avaliacao) REFERENCES tbl_avaliacao (id_avaliacao),
    FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro)
);

CREATE TABLE tbl_avaliacao_cafeteria (
    id_avaliacao_cafeteria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_avaliacao INT NOT NULL,
    id_cafeteria INT NOT NULL,
    FOREIGN KEY (id_avaliacao) REFERENCES tbl_avaliacao (id_avaliacao),
    FOREIGN KEY (id_cafeteria) REFERENCES tbl_cafeteria (id_cafeteria)
);

CREATE TABLE tbl_genero_usuario (
    id_genero_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_genero INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES tbl_genero (id_genero),
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_genero_livro (
    id_genero_livro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_genero INT NOT NULL,
    id_livro INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES tbl_genero (id_genero),
    FOREIGN KEY (id_livro) REFERENCES tbl_livro (id_livro)
);

-- 1. INSERTS NAS TABELAS INDEPENDENTES (BASE)
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
('Manga'),
('Autoajuda'),
('Religioso'),
('Técnico'),
('Educação'),
('Filosofia'),
('Psicologia'),
('Policial');

INSERT INTO tbl_usuario (nome, nome_usuario, email, senha, data_nascimento, foto_perfil) VALUES
('Alex Henrique', 'alex_henrique', 'alex@email.com', 'senha123', '15/10/2004', 'https://linkdafoto.com/alex.jpg'),
('Geovanna Silva', 'geovanna_silva', 'geovanna@email.com', 'senha456', '22/03/2005', 'https://linkdafoto.com/geo.jpg'),
('Carlos Eduardo', 'cadu_leitor', 'carlos@email.com', 'senha789', '05/07/2001', NULL);

INSERT INTO tbl_evento (nome, data_evento, local_evento, endereco, funcionamento) VALUES
('Feira Literária de São Paulo', '25 a 30 de Julho de 2026', 'Expo Center Norte', 'Rua José Bernardo Pinto, 333', 'Das 10h às 22h'),
('Clube do Livro: Especial Terror', '31/10/2026', 'Biblioteca Municipal', 'Av. Paulista, 1500', 'Às 19h00');

INSERT INTO tbl_livro (titulo, isbn, autor, descricao, capa) VALUES
('Duna', '9788551002490', 'Frank Herbert', 'Uma jornada épica no planeta desértico de Arrakis.', 'https://capas.com/duna.jpg'),
('O Iluminado', '9788560280421', 'Stephen King', 'O drama psicológico de Jack Torrance no isolado Hotel Overlook.', 'https://capas.com/iluminado.jpg'),
('Orgulho e Preconceito', '9788582850350', 'Jane Austen', 'O clássico confronto entre Elizabeth Bennet e o Sr. Darcy.', 'https://capas.com/orgulho.jpg');

INSERT INTO tbl_cafeteria (nome, endereco, horario_funcionamento, rede_social, foto) VALUES
('Café & Poesia', 'Praça da Sé, 45 - Centro', 'Segunda a Sábado, das 08h às 20h', '@cafe_e_poesia', 'https://fotos.com/cafeteria1.jpg'),
('Literato Coffe', 'Alameda Santos, 1200 - Paulista', 'Todos os dias, das 09h às 22h', '@literatocofee', 'https://fotos.com/cafeteria2.jpg');


-- 2. INSERTS NAS TABELAS COM DEPENDÊNCIAS DIRETAS (NÍVEL 1)
INSERT INTO tbl_notificacao (titulo, mensagem, id_usuario) VALUES
('Bem-vindo!', 'Obrigado por criar sua conta no ConectaBook.', 1),
('Novo Clube!', 'Um clube de Fantasia que você segue acabou de ser criado.', 2);

INSERT INTO tbl_acesso_livro (id_livro, id_usuario) VALUES
(1, 1), -- Alex acessou Duna
(2, 1), -- Alex acessou O Iluminado
(3, 2); -- Geovanna acessou Orgulho e Preconceito

INSERT INTO tbl_avaliacao (estrelas, mensagem, id_usuario) VALUES
(5, 'Obra-prima da ficção científica, todo mundo deveria ler!', 1),
(4, 'Muito assustador, o King sabe construir tensão.', 2),
(5, 'Ambiente maravilhoso para ler um bom livro enquanto toma um expresso.', 1);

INSERT INTO tbl_clube (nome, sobre, regras, foto, id_genero) VALUES
('Viajantes de Arrakis', 'Clube focado em leitura de Sci-Fi clássica e moderna.', 'Respeitar as opiniões e evitar spoilers sem aviso.', NULL, 2),
('Leitores da Madrugada', 'Para quem gosta de passar a noite lendo histórias assustadoras.', 'Proibido conteúdo ofensivo.', NULL, 4);

-- 3. INSERTS NAS TABELAS DEPENDENTES DE CLUBES E HISTÓRICO (NÍVEL 2)
INSERT INTO tbl_membros (administrador, id_usuario, id_clube) VALUES
(1, 1, 1), -- Alex é administrador do clube Viajantes de Arrakis (1)
(0, 2, 1), -- Geovanna é membro comum do clube Viajantes de Arrakis (0)
(1, 2, 2); -- Geovanna é administradora do Leitores da Madrugada (1)

INSERT INTO tbl_estante (id_usuario, id_status_livro, id_livro) VALUES
(1, 3, 1), -- Alex marcou Duna como "Lido" (3)
(1, 2, 2), -- Alex marcou O Iluminado como "Lendo" (2)
(2, 1, 3); -- Geovanna marcou Orgulho e Preconceito como "Quero Ler" (1)

-- Criando as salas de bate-papo vinculadas aos clubes criados
INSERT INTO tbl_conversa (id_clube) VALUES
(1), -- Conversa/Chat do clube Viajantes de Arrakis
(2); -- Conversa/Chat do clube Leitores da Madrugada

-- Postando mensagens no chat (tbl_mensagem)
INSERT INTO tbl_mensagem (comentario, arquivo, data_postagem, id_usuario, id_mensagem_pai, id_conversa) VALUES
('E aí pessoal, o que estão achando do primeiro capítulo de Duna?', NULL, NOW(), 1, NULL, 1), -- Mensagem 1 (Alex no chat 1)
('Eu achei o começo um pouco lento, mas o universo é incrível!', NULL, NOW(), 2, 1, 1),    -- Mensagem 2 (Geovanna respondendo a msg 1)
('Alguém já terminou o livro do mês?', NULL, NOW(), 3, NULL, 2);                           -- Mensagem 3 (Carlos no chat 2)

-- Curtindo mensagens específicas
INSERT INTO tbl_curtida (id_usuario, id_mensagem) VALUES
(2, 1), -- Geovanna curtiu a mensagem 1 (do Alex)
(1, 2); -- Alex curtiu a resposta da Geovanna (mensagem 2)


-- 4. INSERTS NAS TABELAS INTERMEDIÁRIAS MUITOS-PARA-MUITOS (NÍVEL 3)
-- Vinculando avaliações aos seus respectivos destinos
INSERT INTO tbl_avaliacao_livro (id_avaliacao, id_livro) VALUES
(1, 1), -- Avaliação 1 vai para o Livro 1 (Duna)
(2, 2); -- Avaliação 2 vai para o Livro 2 (O Iluminado)

INSERT INTO tbl_avaliacao_cafeteria (id_avaliacao, id_cafeteria) VALUES
(3, 1); -- Avaliação 3 vai para a Cafeteria 1 (Café & Poesia)

-- Gêneros favoritos dos usuários
INSERT INTO tbl_genero_usuario (id_genero, id_usuario) VALUES
(2, 1), -- Alex curte Sci-Fi
(3, 1), -- Alex curte Fantasia
(4, 2); -- Geovanna curte Terror

-- Gêneros dos livros
INSERT INTO tbl_genero_livro (id_genero, id_livro) VALUES
(2, 1), -- Duna é Sci-Fi
(4, 2), -- O Iluminado é Terror
(1, 3); -- Orgulho e Preconceito é Romance