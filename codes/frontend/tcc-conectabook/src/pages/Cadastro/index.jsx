
import { useState } from "react"
import Input from "../../components/input"
import logo from "../../assets/logo.png"
import "./style.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/button"
import { text } from "@fortawesome/fontawesome-svg-core"

//============== ARRAYS ================

const INPUT_DATA = [
    { id: 1, name: "usuario", label: "Nome de Usuário", placeholder: "Digite seu usuário...", type: "text" },
    { id: 2, name: "nome", label: "Nome Completo", placeholder: "Digite seu nome...", type: "text" },
    { id: 3, name: "email", label: "E-mail", placeholder: "Digite seu e-mail...", type: "email" },
    { id: 4, name: "senha", label: "Senha", placeholder: "Digite sua senha...", type: "password" },
    { id: 5, name: "nascimento", label: "Data de Nascimento", type: "date" },
]

const GENEROS_DATA = [
    { id: 1, value: "Terror" },
    { id: 2, value: "Ação" },
    { id: 3, value: "Aventura" },
    { id: 4, value: "Comédia" },
    { id: 5, value: "Drama" },
    { id: 6, value: "Romance" },
    { id: 7, value: "Ficção Científica" },
    { id: 8, value: "Fantasia" },
    { id: 9, value: "Suspense" },
    { id: 10, value: "Mistério" },
    { id: 11, value: "Animação" },
    { id: 12, value: "Documentário" },
    { id: 13, value: "Musical" },
    { id: 14, value: "Guerra" },
    { id: 15, value: "Histórico" },
    { id: 16, value: "Policial" },
    { id: 17, value: "Crime" },
    { id: 18, value: "Biografia" },
    { id: 19, value: "Esporte" },
    { id: 20, value: "Família" },
    { id: 21, value: "Infantil" },
    { id: 22, value: "Western" },
    { id: 23, value: "Super-herói" },
    { id: 24, value: "Distopia" },
    { id: 25, value: "Apocalipse" }
]

// ================= CONTEÚDO ================= 

function Cadastro() {


    // ============= FUNÇÕES ==============

    function handleChange(e) {

        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        console.log("Dados do formulário:")
        console.log(form)
    }

    function toggleGenero(genero) {


        const lista = form.generosFavorito

        let novaLista

        if (lista.includes(genero)) {
            novaLista = lista.filter(item => item !== genero)
        } else {
            if (lista.length >= 5) return
            novaLista = [...lista, genero]
        }

        setForm({
            ...form,
            generosFavorito: novaLista
        })
    }

    // ================= CONSTANTES =================

    const [form, setForm] = useState({
        usuario: "",
        nome: "",
        email: "",
        senha: "",
        nascimento: "",
        generosFavorito: []
    })

    return (
        <div>
            <header className="header-cadastro">
                <img className="img-header" src={logo} alt="" />
            </header>
            <main className="main-cadastro">
                <div className="titulo-criar-conta">
                    <FontAwesomeIcon icon={faCircleUser} style={{ color: "rgb(116, 192, 252)", }} size="8x" />
                    <h1>Criar Conta</h1>
                    <p>Preencha os dados abaixo para criar sua conta</p>
                </div>

                <div className="formulario">
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            {INPUT_DATA.map((input) => (
                                <div className="input">
                                    <Input
                                        name={input.name}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        value={form[input.name]}
                                        onChange={handleChange}
                                        type={input.type}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="generos-favoritos">
                            <h4>Generos Favoritos</h4>
                            <p>Selecione seus generos favoritos (máx 5)</p>
                            <div className="generos-container">
                                {GENEROS_DATA.map((genero) => (
                                    <button
                                        key={genero.id}
                                        type="button"
                                        className={`genero-tag ${form.generosFavorito.includes(genero.value) ? "ativo" : ""}`}
                                        onClick={() => toggleGenero(genero.value)}
                                    >
                                        {genero.value}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Button
                            text="Criar Conta"
                            type="submit"
                        />
                    </form>
                </div>




                <p>Já tem conta?</p>
                <a className="link-cadastro" href="/login">Fazer Login</a>
            </main>
            <footer className="footer-cadastro">

            </footer>
        </div>
    )
}

export default Cadastro