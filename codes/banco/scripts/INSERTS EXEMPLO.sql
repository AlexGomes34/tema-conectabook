-- Categorias para os livros
INSERT INTO tbl_categoria (nome, descricao) VALUES 
('Ficção Científica', 'Livros que exploram tecnologia futurista e espaço.'),
('Romance', 'Histórias focadas em relacionamentos e drama.'),
('Suspense', 'Livros com mistério e tramas policiais.');

-- Status para a estante de leitura
INSERT INTO tbl_status (nome_status) VALUES 
('Lendo'), 
('Lido'), 
('Quero Ler');

-- Usuários da rede social
INSERT INTO tbl_usuario (nome, nome_usuario, genero_favorito, email, senha, data_nascimento) VALUES 
('Ana Silva', 'aninha_leitora', 'Romance', 'ana@email.com', 'senha123', '2000-05-15'),
('Bruno Costa', 'bruno_books', 'Ficção Científica', 'bruno@email.com', 'senha456', '1995-10-20'),
('Carla Dias', 'carla_literaria', 'Suspense', 'carla@email.com', 'senha789', '1992-03-12');

-- Livros (Dependem da tbl_categoria)
INSERT INTO tbl_livro (titulo, autor, descricao, id_categoria) VALUES 
('Duna', 'Frank Herbert', 'Uma jornada épica no deserto de Arrakis.', 1),
('Orgulho e Preconceito', 'Jane Austen', 'O clássico romance de Elizabeth e Darcy.', 2),
('O Silêncio dos Inocentes', 'Thomas Harris', 'Um suspense psicológico intenso.', 3);

-- Cafeterias (Para o módulo de cafeterias literárias)
INSERT INTO tbl_cafeteria (nome, endereco, horario_funcionamento) VALUES 
('Café & Letras', 'Rua das Flores, 123', '08:00 - 18:00'),
('Expresso Literário', 'Av. Central, 456', '09:00 - 20:00'),
('Livro e Grão', 'Praça da Matriz, 78', '07:00 - 17:00');

-- Estante (Conecta Usuário, Livro e Status)
INSERT INTO tbl_estante (id_usuario, id_status, id_livro) VALUES 
(1, 2, 2), -- Ana leu Orgulho e Preconceito
(2, 1, 1), -- Bruno está lendo Duna
(3, 3, 3); -- Carla quer ler O Silêncio dos Inocentes

-- Avaliações (O usuário avaliando um livro ou cafeteria)
INSERT INTO tbl_avaliacao (estrelas, mensagem, id_usuario, id_livro) VALUES 
(5, 'Melhor livro que já li!', 1, 2);

INSERT INTO tbl_avaliacao (estrelas, mensagem, id_usuario, id_cafeteria) VALUES 
(4, 'Ótimo café, mas o wi-fi é lento.', 2, 1);

-- Notificações (Enviadas para o usuário)
INSERT INTO tbl_notificacao (titulo, mensagem, id_usuario) VALUES 
('Bem-vindo!', 'Obrigado por se juntar ao ConectaBook.', 1),
('Novo Comentário', 'Alguém respondeu sua resenha.', 2),
('Evento Próximo', 'Não esqueça do clube de leitura amanhã.', 3);

-- Definindo os status das mensagens
INSERT INTO tbl_mensagem_status (nome) VALUES ('Post'), ('Resposta');

-- Definindo os módulos do sistema
INSERT INTO tbl_modulo (nome) VALUES ('Feed'), ('Clube'), ('B.P');

-- Mensagem 1: Um post original no Feed
INSERT INTO tbl_mensagem (mensagem, id_usuario, id_mensagem_status) 
VALUES ('Alguém já leu o novo livro do Stephen King?', 1, 1); -- Supondo id_usuario 1 e status 'Post'

-- Mensagem 2: Uma resposta ao post acima
INSERT INTO tbl_mensagem (mensagem, id_usuario, id_mensagem_status) 
VALUES ('Eu li! É assustador, recomendo muito.', 2, 2); -- Supondo id_usuario 2 e status 'Resposta'

-- Mensagem 3: Outra resposta
INSERT INTO tbl_mensagem (mensagem, id_usuario, id_mensagem_status) 
VALUES ('Ainda não tive coragem de começar kkk', 3, 2);

-- Criando o vínculo da primeira resposta ao post (Supondo que os IDs das msgs sejam 1, 2 e 3)
INSERT INTO tbl_conversa (id_mensagem_post, id_mensagem_resposta, id_modulo) VALUES 
(1, 1, 1)
(1, 2, 1), -- Mensagem 2 é uma resposta para a Mensagem 1 no módulo Feed (id 1)
(1, 3, 1); -- Mensagem 3 também é uma resposta para a Mensagem 1 no módulo Feed

