-- Status de Leitura
INSERT INTO tbl_status_livro (nome_status) VALUES ('Lendo'), ('Lido'), ('Quero Ler');

-- Gêneros Literários
INSERT INTO tbl_genero (nome, descricao) VALUES 
('Fantasia', 'Mundos mágicos e épicos'),
('Terror', 'Histórias de medo e suspense'),
('Clássico', 'Obras atemporais da literatura');

-- Usuários
INSERT INTO tbl_usuario (nome, nome_usuario, email, senha, data_nascimento) VALUES 
('Ana Souza', 'ana_leitora', 'ana@email.com', '123', '2002-05-10'),
('Carlos Lima', 'cadulima', 'carlos@email.com', '456', '1998-11-20'),
('Beatriz Silva', 'bia_books', 'bia@email.com', '789', '2005-01-30');

-- Status da Mensagem e Módulos
INSERT INTO tbl_status (nome) VALUES ('Post'), ('Resposta'), ('Editado');
INSERT INTO tbl_modulo (nome) VALUES ('Feed'), ('Clube'), ('B.P');

-- Livros
INSERT INTO tbl_livro (titulo, isbn, autor, descricao, capa) VALUES 
('O Hobbit', '9788595084742', 'J.R.R. Tolkien', 'A aventura de Bilbo Bolseiro.', '1'),
('It: A Coisa', '9788535914849', 'Stephen King', 'Um palhaço assusta crianças em Derry', '2'),
('Dom Casmurro', '9788535923421', 'Machado de Assis', 'A dúvida sobre a traição de Capitu.', '3');

-- Cafeterias
INSERT INTO tbl_cafeteria (nome, endereco, horario_funcionamento, foto) VALUES 
('Café do Livro', 'Rua A, 10', '08:00 - 20:00', 'foto1.jpg'),
('Expresso Literário', 'Av. B, 50', '09:00 - 21:00', 'foto2.jpg'),
('Grão e Prosa', 'Rua C, 100', '07:00 - 18:00', 'foto3.jpg');

-- Mensagens (Posts e Respostas)
INSERT INTO tbl_mensagem (mensagem, id_usuario, id_status) VALUES 
('Alguém querendo ler Tolkien?', 1, 1), -- ID 1 (Post)
('Eu topo! É meu autor favorito.', 2, 2), -- ID 2 (Resposta)
('Já li e é incrível.', 3, 2); -- ID 3 (Resposta)

-- Conversa (Vinculando as respostas ao post ID 1)
INSERT INTO tbl_conversa (id_mensagem_post, id_mensagem_resposta, id_modulo) VALUES 
(1, 2, 1), -- Resposta 2 no Post 1 (Feed)
(1, 3, 1); -- Resposta 3 no Post 1 (Feed)

-- Estante (O que os usuários estão lendo)
INSERT INTO tbl_estante (id_usuario, id_status_livro, id_livro) VALUES 
(1, 1, 1), -- Ana lendo O Hobbit
(2, 2, 2), -- Carlos leu It
(3, 3, 3); -- Bia quer ler Dom Casmurro

-- Avaliações Gerais
INSERT INTO tbl_avaliacao (estrelas, mensagem, id_usuario) VALUES 
(5, 'Excelente!', 1),
(4, 'Muito bom o ambiente', 2),
(3, 'Livro difícil de ler', 3);

-- Acessos aos Livros (Log para "Mais acessados")
INSERT INTO tbl_acesso_livro (id_livro, id_usuario) VALUES (1, 1), (1, 2), (2, 3);

-- Gênero do Livro (Um livro pode ter vários gêneros)
INSERT INTO tbl_genero_livro (id_genero, id_livro) VALUES 
(1, 1), -- O Hobbit é Fantasia
(2, 2), -- It é Terror
(3, 3); -- Dom Casmurro é Clássico

-- Vinculando Avaliações a Livros ou Cafeterias
INSERT INTO tbl_avaliacao_livro (id_avaliacao, id_livro) VALUES (1, 1), (3, 3);
INSERT INTO tbl_avaliacao_cafeteria (id_avaliacao, id_cafeteria) VALUES (2, 1);

-- Gêneros Favoritos do Usuário
INSERT INTO tbl_genero_usuario (id_genero, id_usuario) VALUES (1, 1), (2, 2), (3, 3);
