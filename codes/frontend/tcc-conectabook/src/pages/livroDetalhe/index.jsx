import Footer from "../../components/footer";
import Header from "../../components/header";

import fotoLivro1 from "../../assets/fotoLivro1.jpg"

import Button from "../../components/button/index.jsx"

import styles from "./style.module.css"

import LivroTitulosSemelhantes from "../../components/livroTitulosSemelhantes/index.jsx"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function LivroDetalhe() {

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
            <Header fotoUser={user?.user?.foto_perfil}/>
            <main>
                <div className={styles.mainUp}>
                    <div>
                        <img src={fotoLivro1} alt="" />
                    </div>
                    <div className={styles.leftUpMain}>
                        <div className={styles.leftUpMainText}>
                            <h1>O pequeno principe</h1>
                            <h2>Autor do Livro</h2>
                            <div className={styles.infosLivro}>
                                <div className={styles.infoLivro}>
                                    <p>Aventura</p>
                                </div>
                                <div className={styles.infoLivro}>
                                    <p>Publicado em 1954</p>
                                </div>
                                <div className={styles.infoLivro}>
                                    <p>328 páginas</p>
                                </div>
                            </div>
                            <p className={styles.sobreLivro}>
                                Mussum Ipsum, cacilds vidis litro abertis.  Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Negão é teu passadis, eu sou faxa pretis.

                                Si num tem leite então bota uma pinga aí cumpadi! Bota 1 metro de cachacis aí pra viagem! Delegadis gente finis, bibendum egestas augue arcu ut est. Diuretics paradis num copo é motivis de denguis.

                                Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.
                            </p>
                        </div>

                        <div className={styles.buttons}>
                            <div className={styles.avaliacaoButtons}>
                                <Button text={"Favoritar"} />
                                <Button text={"Avaliacoes"} onClick={() => navigate('/livroAvaliacoes')} />
                            </div>
                            <Button text={"Adicionar a estante"} 
                            className={styles.adicionarEstante}/>
                        </div>
                    </div>
                </div>
            </main>
            
                <LivroTitulosSemelhantes/>
            <Footer />
        </div>
    )
}