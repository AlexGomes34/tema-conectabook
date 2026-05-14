-- Status do Livro
INSERT INTO tbl_status_livro (nome_status) VALUES ('Lendo'), ('Lido'), ('Quero Ler');

-- Gêneros
INSERT INTO tbl_genero (nome, descricao) VALUES 
('Fantasia', 'Mundos mágicos e épicos'),
('Terror', 'Histórias de suspense e medo'),
('Romance', 'Narrativas focadas em relacionamentos');

-- Usuários
INSERT INTO tbl_usuario (nome, nome_usuario, email, senha, data_nascimento, foto_perfil) VALUES 
('Alex Henrique', 'alex_dev', 'alex@email.com', '123', '2009-05-06', 'https://i.pravatar.cc/150?u=1'),
('Beatriz Silva', 'bia_read', 'beatriz@email.com', '123', '2005-03-12', 'https://i.pravatar.cc/150?u=2'),
('Carlos Eduardo', 'cadu_books', 'carlos@email.com', '123', '1998-11-20', 'https://i.pravatar.cc/150?u=3');

-- Eventos
INSERT INTO tbl_evento (nome, data_evento, local_evento, endereco, funcionamento) VALUES 
('Bienal do Livro', '2026-08-15', 'Expo Center', 'Rua das Flores, 123', '09:00 às 22:00'),
('Feira Literária', '2026-10-10', 'Praça Central', 'Av. Brasil, s/n', '10:00 às 18:00'),
('Noite de Autógrafos', '2026-12-01', 'Livraria Cultura', 'Shopping Metrô', '19:00 às 21:00');

-- Livros
INSERT INTO tbl_livro (titulo, isbn, autor, descricao, capa) VALUES 
('Percy Jackson', '9788598078359', 'Rick Riordan', 'Um garoto descobre que é um semideus.', 'https://link.com/percy.jpg'),
('It: A Coisa', '9788535923421', 'Stephen King', 'Um palhaço aterroriza uma cidade.', 'https://link.com/it.jpg'),
('Orgulho e Preconceito', '9788525417312', 'Jane Austen', 'Conflitos de classe e amor na Inglaterra.', 'https://link.com/orgulho.jpg');

-- Cafeterias
INSERT INTO tbl_cafeteria (nome, endereco, horario_funcionamento, rede_social, foto) VALUES 
('Café & Letras', 'Rua do Saber, 45', '08:00 - 20:00', '@cafe_letras', 'https://link.com/cafe1.jpg'),
('Expresso Literário', 'Av. Paulista, 900', '07:00 - 22:00', '@expresso_lit', 'https://link.com/cafe2.jpg'),
('Starbooks', 'Shopping Center, Piso 2', '10:00 - 22:00', '@starbooks_oficial', 'https://link.com/cafe3.jpg');

-- Status de Mensagem e Módulos
INSERT INTO tbl_status (nome) VALUES ('Enviado'), ('Lido'), ('Excluído');
INSERT INTO tbl_modulo (nome) VALUES ('Feed'), ('Clube'), ('Chat Privado');

-- Notificações (Depende de Usuário)
INSERT INTO tbl_notificacao (titulo, mensagem, id_usuario) VALUES 
('Bem-vindo!', 'Obrigado por se juntar ao ConectaBook.', 1),
('Novo Clube', 'Você foi convidado para o clube de Fantasia.', 2),
('Avaliação', 'Alguém curtiu sua resenha.', 3);

-- Acessos ao Livro (Depende de Livro e Usuário)
INSERT INTO tbl_acesso_livro (id_livro, id_usuario) VALUES (1, 1), (2, 2), (3, 3);

-- Avaliações Gerais (Depende de Usuário)
INSERT INTO tbl_avaliacao (estrelas, mensagem, id_usuario) VALUES 
(5, 'Excelente ambiente!', 1),
(4, 'Livro muito bom, mas o final é triste.', 2),
(3, 'O café estava frio.', 3);

-- Clubes (Depende de Gênero)
INSERT INTO tbl_clube (nome, sobre, regras, id_genero) VALUES 
('Amantes de Percy', 'Focado em Rick Riordan', 'Respeitar os membros', 1),
('Medo em Pauta', 'Clube de Terror', 'Não dar spoilers', 2),
('Clássicos Românticos', 'Livros de época', 'Leitura obrigatória do mês', 3);

-- Estante (Depende de Usuário, Status e Livro)
INSERT INTO tbl_estante (id_usuario, id_status_livro, id_livro) VALUES (1, 1, 1), (2, 2, 2), (3, 3, 3);

-- Mensagens (Depende de Usuário e Status)
INSERT INTO tbl_mensagem (mensagem, id_usuario, id_status) VALUES 
('Olá, alguém lendo Percy Jackson?', 1, 1),
('Sim, eu estou no capítulo 5!', 2, 1),
('Alguém recomenda uma cafeteria?', 3, 1);

-- Membros (Usuário + Clube)
INSERT INTO tbl_membros (administrador, id_usuario, id_clube) VALUES (1, 1, 1), (0, 2, 1), (1, 3, 2);

-- Conversas (Resposta de Mensagens + Módulo)
INSERT INTO tbl_conversa (id_mensagem_post, id_mensagem_resposta, id_modulo) VALUES (1, 2, 1);

-- Curtidas (Usuário + Conversa)
INSERT INTO tbl_curtida (id_usuario, id_conversa) VALUES (1, 1);

-- Detalhamento de Avaliações (Livro ou Cafeteria)
INSERT INTO tbl_avaliacao_livro (id_avaliacao, id_livro) VALUES (2, 2);
INSERT INTO tbl_avaliacao_cafeteria (id_avaliacao, id_cafeteria) VALUES (1, 1), (3, 3);

-- Relacionamentos de Gênero
INSERT INTO tbl_genero_usuario (id_genero, id_usuario) VALUES (1, 1), (2, 2), (3, 3);
INSERT INTO tbl_genero_livro (id_genero, id_livro) VALUES (1, 1), (2, 2), (3, 3);