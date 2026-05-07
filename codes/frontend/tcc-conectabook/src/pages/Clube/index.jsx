import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPeopleGroup, faStar, faShieldHalved } from "@fortawesome/free-solid-svg-icons"
import Footer from "../../components/footer"
import fotoClube1 from "../../assets/fotoClube1.jpg"
import Button from "../../components/button"
import Input from "../../components/input"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "./style.css"
import Header from "../../components/header"

const CLUBES_DATA = [
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
    },
    {
        id: 3,
        nome: "Sombras & Mistérios",
        genero: "Terror",
        quantiaMembros: 620,
        sobre: "Clube dedicado a histórias sombrias, suspense e terror psicológico. Ideal para quem gosta de sentir aquele frio na espinha.",
        foto: fotoClube1
    },
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


export default function Clube() {

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

    const clube_membro_selecionado = CLUBE_MEMBRO[0]
    const clube_adm_selecionado = CLUBE_ADM[0]

    return (
        <div>

            <Header 
                fotoUser={user?.foto}/>

            <main className="main-clube">
                <div className="left-clube">
                    <div className="meus-clubes">
                        <div className="titulo-acess">
                            <FontAwesomeIcon icon={faPeopleGroup} />
                            <h2>Clubes faço parte</h2>
                        </div>
                        <div className="clube-acess">
                            <img src={clube_membro_selecionado.foto} alt="Foto do Clube" />
                            <div className="clube-acess-text">
                                <h3>{clube_membro_selecionado.nome}</h3>
                                <p>{clube_membro_selecionado.quantiaMembros} membros</p>
                            </div>
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
                            <img src={clube_adm_selecionado.foto} alt="Foto do Clube" />
                            <div className="clube-acess-text">
                                <h3>{clube_adm_selecionado.nome}</h3>
                                <p>{clube_adm_selecionado.quantiaMembros} membros</p>
                            </div>
                        </div>
                        <Button
                            text={"Ver Todos os clubes"}
                        />
                    </div>

                </div>

                <div className="right-clube">
                    <div className="pesquisa">
                        <Input
                            placeholder={"Procure por um grupo..."} />
                        <Button
                            text={"Criar Clube"} />
                    </div>

                    <div className="titulo-filtros">
                        <div className="titulos">
                            <h2>Descubra clubes de leitura</h2>
                            <p>Encontre seu próximo clube e faça parte de histórias incríveis.</p>
                        </div>
                        <select name="" id="">
                            <option value="mama">aba</option>
                            <option value="mama">aba</option>
                            <option value="mama">aba</option>
                        </select>
                    </div>
                    <div className="clubes">
                        {CLUBES_DATA.map((clube) => {
                            return (
                                <div className="clube-detalhe">
                                    <div className="info-left">
                                        <img src={clube.foto} alt="" />
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

            <Footer/>


        </div>
    )

}