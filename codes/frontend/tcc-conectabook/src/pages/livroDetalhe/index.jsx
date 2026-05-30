import Footer from "../../components/footer";
import Header from "../../components/header";

import fotoLivro1 from "../../assets/fotoLivro1.jpg"

import Button from "../../components/button/index.jsx"

import styles from "./style.module.css"

import LivroTitulosSemelhantes from "../../components/livroTitulosSemelhantes/index.jsx"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function LivroDetalhe() {

    const { id } = useParams();
    const [livro, setLivro] = useState(null);

    const [user, setUser] = useState(null)
    
        useEffect(() => {
    
            const userStorage = JSON.parse(
                localStorage.getItem("user")
            )
    
            if (userStorage) {
                setUser(userStorage)
            }
    
        }, [])

        useEffect(() => {

            async function fetchLivro() {
        
                try {
        
                    const res = await fetch(
                        `https://openlibrary.org/works/${id}.json`
                    )
        
                    const data = await res.json()
        
                    console.log(data)
        
                    // =========================
                    // AUTOR
                    // =========================
        
                    let authorName = "Autor desconhecido"
        
                    if (data.authors?.length > 0) {
        
                        const authorKey = data.authors[0].author.key
        
                        const authorRes = await fetch(
                            `https://openlibrary.org${authorKey}.json`
                        )
        
                        const authorData = await authorRes.json()
        
                        authorName = authorData.name
                    }
        
                    // =========================
                    // GÊNERO
                    // =========================
        
                    const genero =
                        data.subjects?.[0] ??
                        "Gênero não informado"
        
                    // =========================
                    // EDIÇÕES
                    // =========================
        
                    let paginas = "Não informado"
                    let anoPublicacao = "Não informado"
        
                    const editionsRes = await fetch(
                        `https://openlibrary.org/works/${id}/editions.json?limit=1`
                    )
        
                    const editionsData = await editionsRes.json()
        
                    const edition = editionsData.entries?.[0]
        
                    if (edition) {
        
                        paginas =
                            edition.number_of_pages ??
                            "Não informado"
        
                        anoPublicacao =
                            edition.publish_date ??
                            "Não informado"
                    }
        
                    // =========================
                    // LIVRO FINAL
                    // =========================
        
                    setLivro({
                        title: data.title,
        
                        author: authorName,
        
                        description:
                            data.description?.value ??
                            data.description ??
                            "Sem descrição.",
        
                        genero,
        
                        paginas,
        
                        anoPublicacao,
        
                        coverUrl: data.covers?.[0]
                            ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
                            : fotoLivro1
                    })
        
                } catch (error) {
        
                    console.log(error)
        
                }
        
            }
        
            fetchLivro()
        
        }, [id])

    const navigate = useNavigate()

    if(!livro) return <p>Carregando...</p>
    return (
        <div>
            <Header fotoUser={user?.user?.foto_perfil}/>
            <main>
                <div className={styles.mainUp}>
                    <div>
                        <img src={livro.coverUrl} alt="" />
                    </div>
                    <div className={styles.leftUpMain}>
                        <div className={styles.leftUpMainText}>
                            <h1>{livro.title}</h1>
                            <h2>{livro.author}</h2>
                            <div className={styles.infosLivro}>
                                <div className={styles.infoLivro}>
                                    <p>{livro.genero}</p>
                                </div>
                                <div className={styles.infoLivro}>
                                    <p>{livro.anoPublicacao}</p>
                                </div>
                                <div className={styles.infoLivro}>
                                    <p>{livro.paginas}</p>
                                </div>
                            </div>
                            <p className={styles.sobreLivro}>{livro.description}</p>
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
            
                <LivroTitulosSemelhantes livroAtual={{ titulo: livro.title, autor: livro.author }}/>
            <Footer />
        </div>
    )
}