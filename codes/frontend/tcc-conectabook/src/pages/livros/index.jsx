import Input from "../../components/input"
import styles from "./style.module.css"

import Header from "../../components/header/index.jsx"
import Footer from "../../components/footer/index.jsx"

import fotoLivro1 from "../../assets/fotoLivro1.jpg"
import Button from "../../components/button/index.jsx"

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LIVROS_DATA = [
    { id: 1, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.67, imagem: fotoLivro1 },
    { id: 2, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.63, imagem: fotoLivro1 },
    { id: 3, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.80, imagem: fotoLivro1 },
    { id: 4, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.55, imagem: fotoLivro1 },
    { id: 5, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.90, imagem: fotoLivro1 },
    { id: 6, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.70, imagem: fotoLivro1 },
]



export default function Livro() {

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
                        <Input />
                        <select name="" id="">
                            <option value="">Selecione</option>
                        </select>
                    </div>
                </div>
                <div className={styles.livros}>
                    <div className={styles.divMain}>
                        <h3>Livros em destaque</h3>
                        <p>Ver todos</p>
                    </div>
                    <div className={styles.listLivros}>
                        {LIVROS_DATA.map((livro) => (
                            <div key={livro.id} className={styles.livro}>
                                <img src={livro.imagem} alt={livro.nome} />
                                <h4>{livro.nome}</h4>
                                <p>{livro.autor}</p>
                                <p>{livro.avaliacao}</p>
                                <Button
                                    text={"Ver Livro"}
                                    className={styles.button}
                                    onClick={() => navigate('/livroDetalhe')}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.livros}>
                    <div className={styles.divMain}>
                        <h3>Minha estante</h3>
                        <p>Ver todos</p>
                    </div>
                    <div className={styles.listLivros}>
                        {LIVROS_DATA.map((livro) => (
                            <div key={livro.id} className={styles.livro}>
                                <img src={livro.imagem} alt={livro.nome} />
                                <h4>{livro.nome}</h4>
                                <p>{livro.autor}</p>
                                <p>{livro.avaliacao}</p>
                                <Button
                                    text={"Ver Livro"}
                                    className={styles.button}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}