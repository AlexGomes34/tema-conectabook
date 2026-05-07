import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header/index"
import Button from "../../components/button/index"
import Input from "../../components/input/index"
import { Link } from "react-router-dom"
import './style.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faStar, faShieldHalved } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import Footer from "../../components/footer"


function Perfil() {

    const [formData, setFormData] = useState({
        username: "",
        nome: "",
        email: "",
        senha: "",
        nascimento: ""
    })

    const INPUT_DATA = [
        { id: 1, name: "username", label: "Nome de Usuário", placeholder: "Digite seu usuário...", type: "text", required: true },
        { id: 2, name: "nome", label: "Nome Completo", placeholder: "Digite seu nome...", type: "text", required: true },
        { id: 3, name: "email", label: "E-mail", placeholder: "Digite seu e-mail...", type: "email", required: true },
        { id: 4, name: "senha", label: "Senha", placeholder: "Digite sua senha...", type: "password", required: true },
        { id: 5, name: "dataNascimento", label: "Data de Nascimento", type: "date", required: true },
    ]

    const [user, setUser] = useState(null)

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("user"))

        if (userStorage) {
            setUser(userStorage)


            setFormData({
                username: userStorage.username || "",
                nome: userStorage.nome || "",
                email: userStorage.email || "",
                senha: userStorage.senha || "",
                dataNascimento: userStorage.dataNascimento || ""
            })

        }
    }, [])

    function handleChange(e) {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div>
            <Header
                fotoUser={user?.foto}
            />
            <div className="up-perfil">
                <h1>Perfil</h1>
                <Button
                    text={"Editar Perfil"} />
            </div>

            <div className="down-perfil">
                <div className="left-perfil">
                    <div className="user-icon">
                        <img className="img-user" src={user?.foto} alt="Foto do usuário" />
                        <h2>{user?.nome}</h2>
                        <p>@{user?.username}</p>
                    </div>

                    <div className="informacoes-perfil">
                        <div className="info-perfil">
                            <FontAwesomeIcon className="icone-perfil" icon={faBook} />
                            <div className="livros-lido-text">
                                <p className="stats-livro">{user?.stats.livrosLidos}</p>
                                <p>Livros Lidos</p>
                            </div>
                        </div>

                        <div className="info-perfil">
                            <FontAwesomeIcon className="icone-perfil" icon={faStar} />
                            <div className="livros-lido-text">
                                <p className="stats-livro">{user?.stats.resenhas}</p>
                                <p>Resenhas Publicadas</p>
                            </div>
                        </div>
                    </div>

                    <div className="excluir-conta">
                        <Button className="button-excluir" text={"Excluir Conta"} />
                        <p>Essa ação não pode ser desfeita</p>
                    </div>


                </div>

                <div className="right-perfil">
                    <div className="apresentacao-perfil">
                        <h2>Olá, {user?.nome}</h2>
                        <p>Bem vindo á sua conta ConectaBook.</p>
                    </div>

                    <br />
                    <div className="inputs-perfil">
                        {INPUT_DATA.map((input) => (
                            <div className="input-perfil">
                                <Input
                                    name={input.name}
                                    label={input.label}
                                    placeholder={input.placeholder}
                                    value={formData[input.name]}
                                    onChange={handleChange}
                                    type={input.type}
                                    required={input.required}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="seguranca">
                        <FontAwesomeIcon className="icone-perfil" icon={faShieldHalved} />
                        <div className="seguranca-text">
                            <h4>Seus dados estão seguros</h4>
                            <p>Não compartilhe suas informações com terceiros</p>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />


        </div>
    )

}

export default Perfil