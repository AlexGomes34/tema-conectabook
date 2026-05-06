import Button from "../../components/button/index"
import Input from "../../components/input/index"
import logo from "../../assets/pngLogo.png"
import mascote from "../../assets/mascote.png"
import fotoJulio from "../../assets/fotoPessoa1.jpg"
import fotoLeonardo from "../../assets/fotoPessoa2.jpg"
import fotoRaissa from "../../assets/fotoPessoa3.jpg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "./style.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faLocationDot, faPeopleGroup } from "@fortawesome/free-solid-svg-icons"

function Previa({ icon, titulo, desc }) {
    return (
        <div className="previa">
            <FontAwesomeIcon icon={icon} />
            <div className="previa-text">
                <h4>{titulo}</h4>
                <p>{desc}</p>
            </div>
        </div>
    )

}

const USUARIOS_DATA = [
    {
        id: 1,
        nome: "Julio Cesar Santana",
        username: "JcDev",
        email: "julio@gmail.com",
        senha: "12345678",
        foto: fotoJulio,
        dataNascimento: "2000-03-27",
        generosFavoritos: ["Horror", "Suspense"],
        avatar: fotoJulio,
        stats: {
            livrosLidos: 18,
            resenhas: 9
        }
    },
    {
        id: 2,
        nome: "Leonardo Pedreira Da Silva",
        username: "LeoDev",
        email: "leonardo@gmail.com",
        senha: "batata555",
        foto: fotoLeonardo,
        dataNascimento: "1998-07-15",
        generosFavoritos: ["Ficção Científica", "Tecnologia"],
        avatar: fotoLeonardo,
        stats: {
            livrosLidos: 8,
            resenhas: 2
        }
    },
    {
        id: 3,
        nome: "Raissa Soares Da Silva",
        username: "RaiDev32",
        email: "raissa@gmail.com",
        senha: "raissa123",
        foto: fotoRaissa,
        dataNascimento: "2001-11-03",
        generosFavoritos: ["Romance", "Drama"],
        avatar: fotoRaissa,
        stats: {
            livrosLidos: 20,
            resenhas: 10
        }
    },
]

const PREVIAS_DATA = [
    { id: 1, icon: faBook, titulo: "Explore livros", desc: "Encontre novas leituras incríveis" },
    { id: 2, icon: faPeopleGroup, titulo: "Conecte-se", desc: "Participe de clubes e discussões" },
    { id: 3, icon: faLocationDot, titulo: "Descubra lugares", desc: "Encontre lugares incríveis para ler" }
]


function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const [loading, setLoading] = useState(false)

    const emailValido = /\S+@\S+\.\S+/.test(email)



    async function handleLogin(e) {
        e.preventDefault()
        if (!email.trim() || !senha.trim()) {
            setErro("Preencha todos os campos")
            return
        }

        if (!emailValido) {
            setErro("E-mail inválido")
            return
        }

        setErro("")
        setLoading(true)

        try {

            await new Promise(resolve => setTimeout(resolve, 2000))

            const user = USUARIOS_DATA.find(
                (u) => u.email === email && u.senha === senha
            )

            if (!user) {
                throw new Error("E-mail ou senha icorretos")
            }

            localStorage.setItem("user", JSON.stringify(user))

            navigate("/feed")

            console.log("Enviando Dados...")
            console.log("E-mail:", email)
            console.log("Senha", senha)

            await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (error) {
            setErro("Erro ao fazer login")
        } finally {
            setLoading(false)
        }


    }
    return (
        <main className="main-login">
            <div className="left-login">
                <header className="header-login-left">
                    <img className="logo" src={logo} alt="Logo ConectaBook" />
                    <h2>Conecta<span>Book</span></h2>
                </header>
                <div className="text-login-left">
                    <h1><span>Conectando</span> leitores, histórias e lugares.</h1>
                    <p>Descubra livros, compartilhe ideias e faça parte de uma comunidade que ama ler.</p>
                </div>

                <img className="mascote" src={mascote} alt="Mascote ConectaBook" />
            </div>

            <div className="right-login">
                <div className="right-up-login">
                    <div className="text-right-login">
                        <h1>Bem-vindo de volta!</h1>
                        <p className="faca-login">Faça login para continuar sua jornada.</p >
                    </div>

                    <form onSubmit={handleLogin} className="login-input">

                        {erro && <p className="erro">{erro}</p>}
                        <Input
                            label={"E-mail"}
                            value={email}
                            type={"email"}
                            placeholder={"Digite seu e-mail"}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErro("")
                            }}
                            required={true}

                        />


                        <div className="senha">
                            <Input
                                label={"Senha"}
                                value={senha}
                                type="password"
                                placeholder={"Digite sua senha"}
                                onChange={(e) => {
                                    setSenha(e.target.value)
                                    setErro("")
                                }}
                                required={true}
                            />
                            <a className="esqueci-senha" href="/recuperarSenha">Esqueci minha senha</a>
                        </div>

                        <div className="button-login">
                            <Button
                                text={loading ? "Entrando..." : "Entrar"}
                                type="submit"
                                disabled={loading}
                            />
                        </div>

                        <div className="criar-conta-login">
                            <p>Ainda não tem uma conta?</p>
                            <a href="/cadastro">Criar Conta</a>
                        </div>

                    </form>



                </div>

                <div className="footer-login">
                    <div className="previa-footer">

                        {PREVIAS_DATA.map((previa) => (
                            <Previa
                                key={previa.id}
                                titulo={previa.titulo}
                                desc={previa.desc}
                                icon={previa.icon}
                            />

                        ))}


                    </div>
                    <footer className="footer-copyright">2026 <span>ConectaBook</span>. Todos os direitos reservados.</footer>
                </div>

            </div>
        </main>

    )
}

export default Login