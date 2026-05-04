
-- VIEW USUARIO INFORMAÇÕES
-- CREATE VIEW vw_perfil_usuario AS
SELECT 
    u.id_usuario,
    u.nome,
    u.nome_usuario,
    u.email,
    u.senha,
    u.data_nascimento,
    u.foto_perfil,
    -- Busca o gênero favorito
    (SELECT g.nome 
     FROM tbl_genero g
     JOIN tbl_genero_usuario gu ON g.id_genero = gu.id_genero
     WHERE gu.id_usuario = u.id_usuario 
     LIMIT 1) AS genero_favorito,
    -- Contagem de Livros Lidos
    (SELECT COUNT(*) 
     FROM tbl_estante e 
     WHERE e.id_usuario = u.id_usuario 
     AND e.id_status_livro = 2) AS livros_lidos,
    -- Contagem de Resenhas publicadas
    (SELECT COUNT(*) 
     FROM tbl_avaliacao_livro al
     JOIN tbl_avaliacao a ON al.id_avaliacao = a.id_avaliacao
     WHERE a.id_usuario = u.id_usuario) AS resenhas_publicadas
FROM 
    tbl_usuario u;
    
-- VIEW LIVRO INFORMAÇÕES
-- CREATE VIEW vw_livro_inform AS 
SELECT 
	l.titulo,
    l.isbn,
    l.autor,
    l.descricao,
    l.capa,
    (SELECT g.nome
    FROM tbl_genero g
    JOIN tbl_genero_livro gl ON g.id_genero = gl.id_genero
    WHERE gl.id_livro = l.id_livro
    LIMIT 1) AS genero
FROM tbl_livro l;

-- VIEW AVALIAÇÕES
-- CREATE VIEW vw_livro_avaliacoes AS
	
	