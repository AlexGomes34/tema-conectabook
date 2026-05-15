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

const API_GENEROS = "http://localhost:8080/v1/conectaBook/generos"

export default function Clube() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [clubes, setClube] = useState([])
    const [generos, setGenero] = useState([])
    const [generoSelecionado, setGeneroSelecionado] = useState("")
    const API_CLUBES = "http://localhost:8080/v1/conectaBook/clubes"
    const [pesquisa, setPesquisa] = useState("")
    const [clubeAdmin, setClubeAdmin] = useState([])
    const [clubeMembro, setClubeMembro] = useState([])

    const clubesFiltrados = clubes.filter((clube) => {

        const generoValido =
            generoSelecionado === "" ||
            clube.genero ==
            generos.find(
                (genero) => genero.id_genero == generoSelecionado
            )?.nome

        const nomeValido =
            clube.nome.toLowerCase().includes(pesquisa.toLowerCase())

        return generoValido && nomeValido
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

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("user"))

        if (userStorage?.user?.id) {
            buscarClubesAdmin(userStorage.user.id)
            buscarClubesMembro(userStorage.user.id)
        }
    }, [])

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

    async function participarClube(idClube) {
        try {
            const response = await fetch("http://localhost:8080/v1/conectaBook/membros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_usuario: user.user.id,
                    id_clube: idClube,
                    administrador: 0
                })
            })

            if (!response.ok) {
                throw new Error("Erro ao entrar no clube");

            }

            alert("Você entrou no clube com sucesso")
        } catch (error) {
            console.log(error)
            alert("Não foi possível entrar no clube")
        }
    }

    const meuClubeAdmin = clubeAdmin?.[0] || null
    const meuClubeMembro = clubeMembro?.[0] || null

    async function buscarClubesAdmin(idUsuario) {
        try {
            const response = await fetch(
                `http://localhost:8080/v1/conectaBook/membros/usuario/${idUsuario}/admin/`
            )

            const data = await response.json()

            setClubeAdmin(data.response)

        } catch (error) {
            console.log("Erro ao buscar clubes admin", error)
        }
    }

    async function buscarClubesMembro(idUsuario) {
        try {
            const response = await fetch(
                `http://localhost:8080/v1/conectaBook/membros/usuario/${idUsuario}`
            )

            const data = await response.json()

            setClubeMembro(data.response)

        } catch (error) {
            console.log("Erro ao buscar clubes membro", error)
        }
    }

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
                            {meuClubeMembro ? (
                                <Link className="clubePage">
                                    <img
                                        src={
                                            meuClubeMembro.foto
                                                ? `http://localhost:8080/uploads/${meuClubeMembro.foto}`
                                                : FotoClubeDefault
                                        }
                                    />
                                    <div className="clube-acess-text">
                                        <h3>{meuClubeMembro.nome}</h3>
                                        <p>{meuClubeMembro.quantiaMembros} membros</p>
                                    </div>
                                </Link>
                            ) : (
                                <div className="empty-state">
                                    <p>Você ainda não participa de nenhum clube</p>
                                    <Button text="Descobrir clubes" onClick={() => navigate("/clubes")} />
                                </div>
                            )}
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
                            {meuClubeAdmin ? (
                                <Link className="clubePage">
                                    <img
                                        src={
                                            meuClubeAdmin.foto
                                                ? `http://localhost:8080/uploads/${meuClubeAdmin.foto}`
                                                : FotoClubeDefault
                                        }
                                    />
                                    <div className="clube-acess-text">
                                        <h3>{meuClubeAdmin.nome}</h3>
                                        <p>{meuClubeAdmin.quantiaMembros} membros</p>
                                    </div>
                                </Link>
                            ) : (
                                <div className="empty-state">
                                    <p>Você ainda não administra nenhum clube</p>
                                    <Button text="Criar clube" onClick={() => navigate("/criarClube")} />
                                </div>
                            )}
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
                                placeholder={"Procure por um grupo..."}
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)} />
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
                                            <Button text={"Participar do Clube"} onClick={() => participarClube(clube.id_clube)} />
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