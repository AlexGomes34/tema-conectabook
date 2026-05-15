import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPeopleGroup, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Footer from "../../components/footer"
import fotoClube1 from "../../assets/fotoClube1.jpg"
import Button from "../../components/button"
import Input from "../../components/input"
import { useEffect, useState } from "react"
import { Await, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import "./style.css"
import Header from "../../components/header"

import FotoClubeDefault from "../../assets/group.png"


const CLUBE_MEMBRO = [
    {
        id: 1,
        nome: "Clube Semideuses",
        genero: "Aventura",
        quantiaMembros: 760,
        sobre: "Um clube de leitura para fãs de mitologia e aventura, explorando histórias épicas e debatendo teorias sobre heróis e deuses.",
        foto: fotoClube1
    },
    {
        id: 2,
        nome: "Páginas & Café",
        genero: "Romance",
        quantiaMembros: 540,
        sobre: "Para quem ama histórias emocionantes acompanhadas de um bom café. Leituras leves, românticas e cheias de sentimento.",
        foto: fotoClube1
    }
]

const CLUBE_ADM = [
    {
        id: 4,
        nome: "Universo Fantástico",
        genero: "Fantasia",
        quantiaMembros: 890,
        sobre: "Dragões, magia e mundos incríveis. Aqui mergulhamos em universos fantásticos e debatemos teorias sobre sagas famosas.",
        foto: fotoClube1
    },
    {
        id: 5,
        nome: "Leitores Críticos",
        genero: "Clássicos",
        quantiaMembros: 430,
        sobre: "Focado em grandes obras da literatura mundial, com discussões profundas e análises críticas.",
        foto: fotoClube1
    }
]

const API_GENEROS = "http://localhost:8080/v1/conectaBook/generos"

export default function Clube() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [clubes, setClube] = useState([])
    const [generos, setGenero] = useState([])
    const [generoSelecionado, setGeneroSelecionado] = useState("")

    const clubesFiltrados = clubes.filter((clube) => {
        if (generoSelecionado === "") {
            return true
        }

        const generoEncontrado = generos.find(
            (genero) => genero.id_genero == generoSelecionado
        )

        return clube.genero == generoEncontrado?.nome
    })


    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("user"))

        if (!userStorage) {
            navigate("/")
        } else {
            setUser(userStorage)
        }
    }, [])

    useEffect(() => {
        buscarClubes()
        buscarGeneros()
    }, [])

    const API_CLUBES = "http://localhost:8080/v1/conectaBook/clubes"

    async function buscarClubes() {
        try {
            const response = await fetch(API_CLUBES)
            const data = await response.json()

            setClube(data.response)
        } catch (error) {
            console.log(error)
        }


    }

    async function buscarGeneros() {
        try {
            const response = await fetch(API_GENEROS)
            const data = await response.json()

            setGenero(data.response)
        } catch (error) {
            console.log(error)
        }
    }


    const clube_membro_selecionado = CLUBE_MEMBRO[0]
    const clube_adm_selecionado = CLUBE_ADM[0]

    return (
        <div className="body-feedClube">
            <Header
                fotoUser={user?.user?.foto_perfil} />

            <main className="main-clube">
                <div className="left-clube">
                    <div className="meus-clubes">
                        <div className="titulo-acess">
                            <FontAwesomeIcon icon={faPeopleGroup} />
                            <h2>Clubes faço parte</h2>
                        </div>
                        <div className="clube-acess">
                            <Link to="/feedClube" className="clubePage">
                                <img src={clube_membro_selecionado.foto} alt="Foto do Clube" />
                                <div className="clube-acess-text">
                                    <h3>{clube_membro_selecionado.nome}</h3>
                                    <p>{clube_membro_selecionado.quantiaMembros} membros</p>
                                </div>
                            </Link>
                        </div>
                        <Button
                            text={"Ver Todos os clubes"}
                        />
                    </div>

                    <div className="meus-clubes">
                        <div className="titulo-acess">
                            <FontAwesomeIcon icon={faPeopleGroup} />
                            <h2>Clubes Administro</h2>
                        </div>
                        <div className="clube-acess">
                            <Link className="clubePage">
                                <img src={clube_adm_selecionado.foto} alt="Foto do Clube" />
                                <div className="clube-acess-text">
                                    <h3>{clube_adm_selecionado.nome}</h3>
                                    <p>{clube_adm_selecionado.quantiaMembros} membros</p>
                                </div>
                            </Link>

                        </div>
                        <Button
                            text={"Ver Todos os clubes"}
                        />
                    </div>

                </div>

                <div className="right-clube">
                    <div className="pesquisa">
                        <div className="input-clube">
                        <Input
                            placeholder={"Procure por um grupo..."} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        
                        <Button
                            onClick={() => navigate("/criarClube")}
                            text={"Criar Clube"} />
                    </div>

                    <div className="titulo-filtros">
                        <div className="titulos">
                            <h2>Descubra clubes de leitura</h2>
                            <p>Encontre seu próximo clube e faça parte de histórias incríveis.</p>
                        </div>
                        <select
                            name="genero"
                            id="genero"
                            value={generoSelecionado}
                            onChange={(e) => setGeneroSelecionado(e.target.value)}
                        >
                            <option value="">Todos os generos</option>
                            {generos.map((genero) => (
                                <option
                                    key={genero.id_genero}
                                    value={genero.id_genero}
                                >
                                    {genero.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="clubes">
                        {clubesFiltrados.map((clube) => {
                            return (
                                <div className="clube-detalhe" key={clube.id_clube}>
                                    <div className="info-left">
                                        <img src={clube.foto
                                            ? `http://localhost:8080/uploads/${clube.foto}`
                                            : FotoClubeDefault} alt="" />
                                        <div className="info-clube">
                                            <h3>{clube.nome}</h3>
                                            <div className="p-clube">
                                                <p>{clube.genero}</p>
                                                <p>{clube.quantiaMembros} membros</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sobre-clube">
                                        <div className="sobre-clube-text">
                                            <h4>Sobre o clube</h4>
                                            <p className="sobre-text">{clube.sobre}</p>
                                        </div>
                                        <div className="button-sobre">
                                            <Button text={"Participar do Clube"} />
                                        </div>

                                    </div>
                                </div>
                            )

                        })}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )

}