import Button from "../../components/button/index"
import Input from "../../components/input/index"
import logo from "../../assets/pngLogo.png"
import mascote from "../../assets/mascote.png"
import { useState } from "react"

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

const PREVIAS_DATA = [
    { id: 1, icon: faBook, titulo: "Explore livros", desc: "Encontre novas leituras incríveis" },
    { id: 2, icon: faPeopleGroup, titulo: "Conecte-se", desc: "Participe de clubes e discussões" },
    { id: 3, icon: faLocationDot, titulo: "Descubra lugares", desc: "Encontre lugares incríveis para ler" }
]


function Login() {
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
            console.log("Enviando Dados...")
            console.log("E-mail:", email)
            console.log("Senha", senha)

            await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (error) {
            setErro("Erro ao fazer login")
        } finally{
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
                            placeholder={"Digite seu e-mail"}
                            onChange={(e) =>{ 
                                setEmail(e.target.value)
                                setErro("")}}
                            
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
                            />
                            <a className="esqueci-senha" href="/recuperarSenha">Esqueci minha senha</a>
                        </div>

                        <div className="button-login">
                            <Button
                                text={loading? "Entrando...":"Entrar"}
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