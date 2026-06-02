import Button from "../../components/button";
import Footer from "../../components/footer";
import Header from "../../components/header";
import LivroTitulosSemelhantes from "../../components/livroTitulosSemelhantes";

import fotoLivro1 from "../../assets/fotoLivro1.jpg"
import fotoPessoa1 from "../../assets/fotoPessoa1.jpg"

import styles from "./style.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTags, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080"

export default function LivroAvaliacao() {

    const { state } = useLocation()
    const livro = state?.livro  // dados vindos do LivroDetalhe

    const [user, setUser] = useState(null)
    const [avaliacoes, setAvaliacoes] = useState([])
    const [media, setMedia] = useState(null)
    const [novaAvaliacao, setNovaAvaliacao] = useState("")
    const [carregando, setCarregando] = useState(true)

    // Usuário do localStorage
    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("user"))
        if (userStorage) setUser(userStorage)
    }, [])

    // Backend — avaliações e média
    useEffect(() => {
        if (!livro) return

        async function fetchAvaliacoes() {
            try {
                const [avaliacoesRes, mediaRes] = await Promise.all([
                    fetch(`${API_URL}/avaliacoes/${livro.id}`),
                    fetch(`${API_URL}/avaliacoes/media/${livro.id}`)
                ])

                const avaliacoesData = await avaliacoesRes.json()
                const mediaData = await mediaRes.json()

                setAvaliacoes(avaliacoesData)
                setMedia(mediaData)
            } catch (error) {
                console.error("Erro ao buscar avaliações:", error)
            } finally {
                setCarregando(false)
            }
        }

        fetchAvaliacoes()
    }, [livro])

    // POST — publicar avaliação
    async function handlePublicar() {
        if (!novaAvaliacao.trim()) return

        try {
            const res = await fetch(`${API_URL}/avaliacoes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    livroId: livro.id,
                    userId: user?.user?.id,
                    texto: novaAvaliacao
                })
            })

            if (res.ok) {
                const criada = await res.json()
                setAvaliacoes(prev => [criada, ...prev])
                setNovaAvaliacao("")
            }
        } catch (error) {
            console.error("Erro ao publicar avaliação:", error)
        }
    }

    if (!livro) return <p>Livro não encontrado.</p>
    if (carregando) return <p>Carregando...</p>

    return (
        <div>
            <Header fotoUser={user?.user?.foto_perfil} />
            <main>
                <div>
                    <img src={livro.coverUrl ?? fotoLivro1} alt="" />
                    <div className={styles.infosLivro}>
                        <div className={styles.infoLivro}>
                            <FontAwesomeIcon className={styles.icone} icon={faStar} size="lg" />
                            <div>
                                <p>Média</p>
                                <p>{media?.media ?? "—"}</p>
                            </div>
                        </div>
                        <div className={styles.infoLivro}>
                            <FontAwesomeIcon className={styles.icone} icon={faTags} size="lg" />
                            <div>
                                <p>Classificação</p>
                                <p>{media?.classificacao ?? "—"}</p>
                            </div>
                        </div>
                        <div className={styles.infoLivro}>
                            <FontAwesomeIcon className={styles.icone} icon={faPeopleGroup} size="lg" />
                            <div>
                                <p>Avaliações</p>
                                <p>{media?.total ?? "—"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.livroTitulo}>
                        <div>
                            <h1>{livro.title}</h1>
                            <p>{livro.author}</p>
                        </div>
                        <Button text={"Publicar"} onClick={handlePublicar} />
                    </div>

                    <textarea
                        placeholder="Escreva sua avaliação..."
                        value={novaAvaliacao}
                        onChange={(e) => setNovaAvaliacao(e.target.value)}
                    />

                    <div className={styles.users}>
                        {avaliacoes.length === 0 && <p>Nenhuma avaliação ainda.</p>}
                        {avaliacoes.map((avaliacao, index) => (
                            <div key={avaliacao.id ?? index} className={styles.user}>
                                <div className={styles.userPost}>
                                    <img src={avaliacao.foto_perfil ?? fotoPessoa1} alt="" />
                                    <p>{avaliacao.nome_usuario ?? "Usuário"}</p>
                                </div>
                                <div>
                                    <p>{avaliacao.texto}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <LivroTitulosSemelhantes livroAtual={{ titulo: livro.title, autor: livro.author }} />
            <Footer />
        </div>
    )
}