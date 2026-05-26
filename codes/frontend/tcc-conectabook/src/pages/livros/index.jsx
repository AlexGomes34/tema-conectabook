import Input from "../../components/input"
import styles from "./style.module.css"

import Header from "../../components/header/index.jsx"
import Footer from "../../components/footer/index.jsx"

import fotoLivro1 from "../../assets/fotoLivro1.jpg"
import Button from "../../components/button/index.jsx"

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardLivro from "../../components/CardLivro/CardLivro.jsx"

const LIVROS_DATA = [
  { id: 1, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.67, imagem: fotoLivro1 },
  { id: 2, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.63, imagem: fotoLivro1 },
  { id: 3, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.80, imagem: fotoLivro1 },
  { id: 4, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.55, imagem: fotoLivro1 },
  { id: 5, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.90, imagem: fotoLivro1 },
]

const genres = [
  {
    "id": 1,
    "name": "fantasy",
    "label": "Fantasia"
  },
  {
    "id": 2,
    "name": "romance",
    "label": "Romance"
  },
  {
    "id": 3,
    "name": "science_fiction",
    "label": "Ficção Científica"
  },
  {
    "id": 4,
    "name": "horror",
    "label": "Terror"
  },
  {
    "id": 5,
    "name": "adventure",
    "label": "Aventura"
  },
  {
    "id": 6,
    "name": "mystery",
    "label": "Mistério"
  },
  {
    "id": 7,
    "name": "thriller",
    "label": "Thriller"
  },
  {
    "id": 8,
    "name": "history",
    "label": "História"
  },
  {
    "id": 9,
    "name": "biography",
    "label": "Biografia"
  },
  {
    "id": 10,
    "name": "poetry",
    "label": "Poesia"
  },
  {
    "id": 11,
    "name": "drama",
    "label": "Drama"
  },
  {
    "id": 12,
    "name": "comics",
    "label": "Quadrinhos"
  },
  {
    "id": 13,
    "name": "manga",
    "label": "Mangá"
  },
  {
    "id": 14,
    "name": "young_adult",
    "label": "Young Adult"
  },
  {
    "id": 15,
    "name": "children",
    "label": "Infantil"
  },
  {
    "id": 16,
    "name": "religion",
    "label": "Religião"
  },
  {
    "id": 17,
    "name": "psychology",
    "label": "Psicologia"
  },
  {
    "id": 18,
    "name": "philosophy",
    "label": "Filosofia"
  }
]



export default function Livro() {

  const [books, setBooks] = useState([])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm && !selectedGenre) return

    setIsSearching(true)
    setHasSearched(true)

    let query = searchTerm
    if (selectedGenre) query += ` subject:${selectedGenre}`

    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=50`
    )
    const data = await res.json()

    const mapped = data.docs.map(book => ({
      key: book.key,
      title: book.title,
      author: book.author_name?.[0],
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null
    }))

    setSearchResults(mapped)
    setIsSearching(false)
  }

  useEffect(() => {
    fetch('https://openlibrary.org/trending/daily.json?limit=5')
      .then(res => res.json())
      .then(data => {
        const mapped = data.works.map(book => ({
          key: book.key,
          title: book.title,
          author: book.author_name?.[0],
          coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        }))

        setBooks(mapped)
      })
  }, [])

  console.log(books)

  const [user, setUser] = useState(null)

  useEffect(() => {

    const userStorage = JSON.parse(
      localStorage.getItem("user")
    )

    if (userStorage) {
      setUser(userStorage)
    }

  }, [])


  const navigate = useNavigate()
  return (
    <div>
      <Header fotoUser={user?.user?.foto_perfil} />
      <div className={styles.main}>
        <div className={styles.upMain}>
          <div className={styles.upMainLeft}>
            <h2>Descubra seu próximo livro</h2>
            <p>Encontre histórias, conecte-se com leitores e transforme sua leitura em algo ainda mais especial.</p>
          </div>
          <div className={styles.upMainRight}>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              name="" id="">

              <option value=""> Todos os gêneros </option>
              {genres.map((genero) => (
                <option key={genero.id} value={genero.name}>
                  {genero.label}
                </option>
              ))}
            </select>
            <Button text={"Buscar"} onClick={handleSearch} />
          </div>
        </div>



        {/* Só aparece se NÃO buscou ainda */}
        {!hasSearched && (
          <>
            <div className={styles.livros}>
              <div className={styles.divMain}>
                <h3>Livros em destaque</h3>
                <Button text={"Ver Todos"} onClick={() => navigate('/todosLivros')} />
              </div>
              <div className={styles.listLivros}>
                {books.map((livro) => (
                  <CardLivro
                    key={livro.key}
                    imagem={livro.coverUrl}
                    titulo={livro.title}
                    autor={livro.author}
                    rota={`/livroDetalhe/${livro.key.split('/works/')[1]}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.livros}>
              <div className={styles.divMain}>
                <h3>Minha estante</h3>
                <Button text={"Ver Todos"} onClick={() => navigate('/todosLivros')} />
              </div>
              <div className={styles.listLivros}>
                {LIVROS_DATA.map((livro) => (
                  <CardLivro
                    key={livro.id}
                    imagem={livro.imagem}
                    titulo={livro.nome}
                    autor={livro.autor}
                    avaliacao={livro.avaliacao}
                    rota={`/livroDetalhe/${livro.id}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Só aparece após buscar */}
        {hasSearched && (
          <div className={styles.livros}>
            <div className={styles.divMain}>
              <h3>Resultados da busca</h3>
              {/* Botão para voltar ao estado inicial */}
              <Button text={"Limpar busca"} onClick={() => {
                setHasSearched(false)
                setSearchResults([])
                setSearchTerm("")
                setSelectedGenre("")
              }} />
            </div>
            {isSearching ? (
              <p>Buscando...</p>
            ) : (
              <div className={styles.listLivros}>
                {searchResults.map((livro) => (
                  <CardLivro
                    key={livro.key}
                    imagem={livro.coverUrl}
                    titulo={livro.title}
                    autor={livro.author}
                    rota={`/livroDetalhe/${livro.key.split('/works/')[1]}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}