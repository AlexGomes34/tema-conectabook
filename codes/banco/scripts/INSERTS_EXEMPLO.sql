
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