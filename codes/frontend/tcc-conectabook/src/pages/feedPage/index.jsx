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

    const POSTS_API = "http://localhost:8080/v1/conectaBook/mensagem/feed/principal"


    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("user"))

        if (!userStorage) {
            navigate("/")
        } else {
            setUser(userStorage)
        }

        async function getPosts() {
            try {
                const response = await fetch(POSTS_API)

                const data = await response.json()

                console.log(data.response)

                setPosts(data.response)
            } catch (error) {
                console.log(error)

            }
        }

        getPosts()
    }, [])


    return (

        <div>
            <Header
                fotoUser={user?.user?.foto_perfil}
            />
            <div className={styles.mainFeed}>
                <LeftFeed posts={posts} idConversa={1}/>
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
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />

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
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />

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
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />

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
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />

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
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />

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
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: "rgb(255, 212, 59)", }} />

                                        </div>
                                        <p>4.6</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Feed