import Footer from "../../components/footer";
import Header from "../../components/header";
import Button from "../../components/button";
import Input from "../../components/input";

import "./style.css"
import { useEffect, useState } from "react";

const INPUT_DATA = [
    { id: 1, name: "nome", label: "Nome do Clube", placeholder: "Digite o name do clube...", type: "text", required: true },
    { id: 2, name: "sobre", label: "Sobre", placeholder: "Descreva o clube...", type: "text", required: true },
    { id: 3, name: "regras", label: "Regras", placeholder: "Descreva as regras do clube...", type: "text", required: true },
]

const API_GENEROS = "http://localhost:8080/v1/conectaBook/generos"
const API_CLUBES = "http://localhost:8080/v1/conectaBook/clubes"

export default function CriarClube() {

    function verificarDuplicados(clubes, form) {
        const clubeExiste = clubes.some(
            c => c.nome === form.nome
        )

        if (clubeExiste) {
            return "Clube existente"
        }

        return null
    }

    function validarFormulario() {
        const { nome, sobre, regras, id_genero } = form

        if (!nome.trim()) return "Nome obrigatório"
        if (!sobre.trim()) return "Nome obrigatório"
        if (!regras.trim()) return "Nome obrigatório"
        if (!id_genero) return "genero obrigatório"

        return null
    }

    function handleChange(e) {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const erro = validarFormulario()

        if (erro) {
            alert(erro)
            return
        }

        try {
            const responseClubes = await fetch("http://localhost:8080/v1/conectaBook/clubes")
            const dataClubes = await responseClubes.json()

            const erroDuplicado = verificarDuplicados(dataClubes.response, form)

            if (erroDuplicado) {
                alert(erroDuplicado)
                return
            }

            const formData = new FormData()

            formData.append("nome", form.nome)
            formData.append("sobre", form.sobre)
            formData.append("regras", form.regras)
            formData.append("id_genero", form.id_genero)

            if (form.foto) {
                formData.append("foto", form.foto)
            }



            const responseClube = await fetch(API_CLUBES, {
                method: "POST",
                body: formData
            })

            const data = await responseClube.json()

            console.log("RESPOSTA DA API:", data)

            if (!responseClube.ok || !data.response?.id_clube) {
                throw new Error("Erro ao cadastrar clube");
            }

            const usuario = JSON.parse(localStorage.getItem("user"))
            const idUsuario = usuario?.user?.id

            console.log("USUARIO DO LOCALSTORAGE:", usuario)
            console.log("ID USUARIO:", usuario?.user?.id)

            const idClube = data.response.id_clube || data.response.id

            const responseMembros = await fetch("http://localhost:8080/v1/conectaBook/membros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_usuario: idUsuario,
                    id_clube: idClube,
                    administrador: 1
                })
            })

            if (!responseMembros.ok) {
                throw new Error("Erro ao criar admin do clube");
            }

            alert("Clube criado com sucesso")

        } catch (error) {
            console.log(error)
            alert("Erro no servidor")

        }
    }

    function handleFotoChange(e) {
        const file = e.target.files[0]

        if (file) {
            setForm({
                ...form,
                foto: file
            })

            setPreview(URL.createObjectURL(file))
        }
    }

    const [form, setForm] = useState({
        nome: "",
        sobre: "",
        regras: "",
        id_genero: "",
        foto: null
    })

    const [preview, setPreview] = useState(null)

    const [generos, setGeneros] = useState([])

    useEffect(() => {
        async function buscarGeneros() {
            try {
                const response = await fetch(API_GENEROS)
                const data = await response.json()

                setGeneros(data.response)
            } catch (error) {
                console.log("Erro ao buscar generos", error)
            }
        }

        buscarGeneros()
    }, [])

    return (
        <div className="container-criarClube">
            <Header />
            <main className="main-criarClube">
                <div className="criarClube-card">

                    <form className="formulario-criarClube" onSubmit={handleSubmit}>
                        <div className="titulo-criarClube">
                            <h2>Criar Clube</h2>
                            <p>Preencha as informações a seguir:</p>
                        </div>
                        <div className="questionario-criarClube">
                            <div className="left-criarClube">
                                <div className="upload-box">
                                    <h2>Foto</h2>
                                    <input
                                        type="file"
                                        id="foto"
                                        accept="image/*"
                                        onChange={handleFotoChange}
                                    />

                                    <label htmlFor="foto" className="upload-label">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="preview-image" />
                                        ) : (
                                            "+"
                                        )}
                                    </label>
                                </div>

                                <div className="comboBox">
                                    <h2>Genero</h2>
                                    <select name="id_genero" value={form.id_genero} onChange={handleChange}>
                                        <option value="">Selecione uma opção</option>
                                        {generos.map((genero) => (
                                            <option key={genero.id_genero} value={genero.id_genero}>
                                                {genero.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div className="right-criarClube">
                                {INPUT_DATA.map((input) => (
                                    <Input
                                        key={input.id}
                                        id={input.id}
                                        name={input.name}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        value={form[input.name]}
                                        onChange={handleChange}
                                        type={input.type}
                                        required={input.required}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <Button
                                text={"Criar Clube"} />
                        </div>

                    </form>
                </div>
            </main>
            <Footer />
        </div>

    )
}