import Button from "../../components/button";
import Header from "../../components/header";
import Footer from "../../components/footer";

import Input from "../../components/input/index.jsx"

import fotoPessoa1 from "../../assets/fotoPessoa1.jpg"
import fotoClube1 from "../../assets/fotoClube1.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

import "./style.css"

import { useEffect, useState } from "react";

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

export default function FeedClube() {

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

        <div className="feedClube-container">
            <Header fotoUser={user?.user?.foto_perfil} />
            <main className="main-container">
                <div className="up-main">
                    <div className="up-left-main">
                        <Button text="Feed" />
                        <Button text="Membros" onClick={() => navigate('/membros')} />
                    </div>
                    <Button onClick={() => navigate("/editarClube")} text="Editar" />
                </div>
                <div className="main-feedClube">
                    <div className="left-main">
                        <div className="titulo-left-main">
                            <h2>Amantes de Percy Jackson</h2>
                            <p>320 membros</p>
                        </div>

                        <div className="input-postagem">
                            <div className="inputComFoto">
                                <img src={fotoPessoa1} alt="" />
                                <Input
                                    placeholder="O que está pensando?"
                                />
                            </div>
                            <div className="inputComArquivo">
                                <Button text="Arquivo" />
                                <Button text="Postar" />
                            </div>
                        </div>

                        {POSTS_DATA.map((post) => (
                            <div className="postagem">
                                <img src={post.foto} alt="" />

                                <div className="postagem-text">
                                    <div className="info-post">
                                        <h3>{post.nome}</h3>
                                    </div>

                                    <p>{post.postagem}</p>
                                    <div className="reacoes">
                                        <div className="reacao">
                                            <FontAwesomeIcon icon={faHeart} />
                                            <p>{post.curtidas}</p>
                                        </div>
                                        <div className="reacao">
                                            <FontAwesomeIcon icon={faComment} />
                                            <p>{post.comentarios}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>

                    <div className="right-main">
                        <div className="sobre">
                            <h3>Sobre</h3>
                            <p>
                                Somos mais do que um clube de leitura — somos um acampamento para semideuses apaixonados pelo universo de Percy Jackson & the Olympians.

                                Aqui, leitores se reúnem para explorar mitologia grega, teorias sobre os personagens, batalhas épicas, profecias e todos os momentos marcantes das aventuras de Percy, Annabeth, Grover e companhia.

                                Nosso clube é um espaço para compartilhar opiniões, fazer amizades, participar de debates, indicar livros do universo de Rick Riordan e viver a experiência de leitura de forma divertida e interativa.

                                Se você já escolheu seu chalé no Acampamento Meio-Sangue, este é o lugar certo para você
                            </p>
                        </div>
                        <div className="administradores">
                            <h3>Administradores</h3>
                            <div className="adm">
                                <img src={fotoPessoa1} alt="" />
                                <p>Batata123</p>
                            </div>
                            <div className="adm">
                                <img src={fotoPessoa1} alt="" />
                                <p>Chiclete com banana</p>
                            </div>
                            <div className="adm">
                                <img src={fotoPessoa1} alt="" />
                                <p>Chipanze de asa</p>
                            </div>
                        </div>
                        <div className="clubesMesmoGenero">
                            <h3>
                                Clubes do mesmo Genero
                            </h3>
                            <div className="clube-diverso">
                                <img src="" alt="" />
                                <div className="titulo-clube-diverso">
                                    <p>Mitologia</p>
                                    <p>285 membros</p>
                                </div>
                                <Button text="Ver clube" />
                            </div>
                            <div className="clube-diverso">
                                <div className="titulo-clube-diverso">
                                    <p>Mitologia</p>
                                    <p>285 membros</p>
                                </div>
                                <Button text="Ver clube" />
                            </div>
                            <div className="clube-diverso">
                                <div className="titulo-clube-diverso">
                                    <p>Mitologia</p>
                                    <p>285 membros</p>
                                </div>
                                <Button text="Ver clube" />
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}