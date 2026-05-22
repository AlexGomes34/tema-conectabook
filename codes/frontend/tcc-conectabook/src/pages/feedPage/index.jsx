import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header/index"
import LeftFeed from "../../components/feed"

import fotoPessoa1 from "../../assets/fotoPessoa1.jpg"

import styles from "./style.module.css"

import fotoLivro1 from "../../assets/fotoLivro1.jpg"
import fotoClube1 from "../../assets/fotoClube1.jpg"
import Footer from "../../components/footer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfStroke
} from "@fortawesome/free-solid-svg-icons";

import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function Feed() {

    const POSTS_DATA = [
        {
            id: 1,
            nome: "Renato Zimbaue",
            foto: fotoPessoa1,
            postagem:
                "Terminei de ler O Hobbit e fiquei impressionado com a construção do mundo do Tolkien. A aventura consegue ser leve e épica ao mesmo tempo.",
            curtidas: 7,
            comentarios: 10
        },

        {
            id: 2,
            nome: "Ana Clara",
            foto: fotoPessoa1,
            postagem:
                "Comecei Maus hoje e já senti o peso emocional da história nas primeiras páginas. A arte simples deixa tudo ainda mais impactante.",
            curtidas: 15,
            comentarios: 6
        },

        {
            id: 3,
            nome: "Lucas Ferreira",
            foto: fotoPessoa1,
            postagem:
                "Vocês também têm dificuldade para escolher o próximo livro depois de terminar uma leitura muito boa? Estou nesse vazio literário agora 😭",
            curtidas: 21,
            comentarios: 14
        },

        {
            id: 4,
            nome: "Marina Costa",
            foto: fotoPessoa1,
            postagem:
                "1984 continua sendo um dos livros mais assustadores que já li. É absurdo como a obra ainda parece atual.",
            curtidas: 30,
            comentarios: 18
        },

        {
            id: 5,
            nome: "Pedro Henrique",
            foto: fotoPessoa1,
            postagem:
                "Passei a tarde inteira organizando minha estante e percebi que compro livros mais rápido do que consigo ler 😂",
            curtidas: 12,
            comentarios: 4
        }
    ]

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("user"))

        if (!userStorage) {
            navigate("/")
        } else {
            setUser(userStorage)
        }
    }, [])

    return (
        <div>
            <Header
                fotoUser={user?.user?.foto_perfil}
            />
            <div className={styles.mainFeed}>
                <LeftFeed posts={POSTS_DATA} />
                <div className={styles.feedPageRight}>
                    <div className={styles.divRight}>
                        <div className={styles.divRightTitulo}>
                            <h3>Titulos Sugeridos</h3>
                            <p>Ver Todos</p>
                        </div>
                        <div className={styles.titulos}>
                            <img src={fotoLivro1} alt="" />
                            <div>
                                <h4>Kallocaína</h4>
                                <p>Karin Boye</p>
                                <div>
                                    <div className={styles.avaliacao}>
                                        <div>
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        
                                        </div>
                                        <p>4.6</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.titulos}>
                            <img src={fotoLivro1} alt="" />
                            <div >
                                <h4>Kallocaína</h4>
                                <p>Karin Boye</p>
                                <div>
                                    <div className={styles.avaliacao}>
                                        <div>
                                            <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        
                                        </div>
                                        <p>4.6</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.titulos}>
                            <img src={fotoLivro1} alt="" />
                            <div>
                                <h4>Kallocaína</h4>
                                <p>Karin Boye</p>
                                <div>
                                    <div className={styles.avaliacao}>
                                        <div>
                                            <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        
                                        </div>
                                        <p>4.6</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divRight}>
                        <div className={styles.divRightTitulo}>
                            <h3>Meus Clube de Literatura</h3>
                            <p>Ver todos</p>
                        </div>
                        <div className={styles.clubesFeed}>
                            <div className={styles.clube}>
                                <img className={styles.imagemClube} src={fotoClube1} alt="" />
                                <div>
                                    <h4>Clube de Livro</h4>
                                    <p>1,2k membros</p>
                                </div>
                            </div>
                            <div className={styles.clube}>
                                <img className={styles.imagemClube} src={fotoClube1} alt="" />
                                <div>
                                    <h4>Clube de Livro</h4>
                                    <p>1,2k membros</p>
                                </div>
                            </div>
                            <div className={styles.clube}>
                                <img className={styles.imagemClube} src={fotoClube1} alt="" />
                                <div>
                                    <h4>Clube de Livro</h4>
                                    <p>1,2k membros</p>
                                </div>
                            </div>
                            <div className={styles.clube}>
                                <img className={styles.imagemClube} src={fotoClube1} alt="" />
                                <div>
                                    <h4>Clube de Livro</h4>
                                    <p>1,2k membros</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={styles.divRight}>
                        <div className={styles.divRightTitulo}>
                            <h3>Mais Lidos do Mês</h3>
                            <p>Ver todos</p>
                        </div>

                        <div className={styles.titulos}>
                            <img src={fotoLivro1} alt="" />
                            <div>
                                <h4>Kallocaína</h4>
                                <p>Karin Boye</p>
                                <div>
                                    <div className={styles.avaliacao}>
                                        <div>
                                            <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        
                                        </div>
                                        <p>4.6</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.titulos}>
                            <img src={fotoLivro1} alt="" />
                            <div>
                                <h4>Kallocaína</h4>
                                <p>Karin Boye</p>
                                <div>
                                    <div className={styles.avaliacao}>
                                        <div>
                                            <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        
                                        </div>
                                        <p>4.6</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.titulos}>
                            <img src={fotoLivro1} alt="" />
                            <div>
                                <h4>Kallocaína</h4>
                                <p>Karin Boye</p>
                                <div>
                                    <div className={styles.avaliacao}>
                                        <div>
                                            <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        <FontAwesomeIcon icon={faStar} style={{color: "rgb(255, 212, 59)",}} />
                                        
                                        </div>
                                        <p>4.6</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    )
}

export default Feed