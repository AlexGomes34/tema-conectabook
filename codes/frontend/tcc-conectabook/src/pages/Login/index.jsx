import Button from "../../components/button/index"
import Input from "../../components/input/index"
import logo from "../../assets/logo.png"
import mascote from "../../assets/mascote.png"

import "./style.css"


function Login() {
    return (
        <main>
            <div className="left-login">
                <header className="header-login-left">
                    <img className="logo" src={logo} alt="Logo ConectaBook" />
                    <p>Conecta<span>Book</span></p>
                </header>
                <div className="text-login-left">
                    <h1><span>Conectando</span> leitores, histórias e lugares.</h1>
                    <p>Descubra livros, compartilhe ideias e faça parte de uma comunidade que ama ler.</p>
                </div>

                <img className="mascote" src={mascote} alt="Mascote ConectaBook" />
            </div>

            <div className="right-login">
                <div>
                    <h2>Bem-vindo de volta!</h2>
                    <h4>Faça login para continuar sua jornada.</h4>
                </div>

                <div>
                    <Input
                        label={"E-mail"}
                        placeholder={"Digite seu e-mail"}
                    />
                    <Input
                        label={"Senha"}
                        placeholder={"Digite sua senha"}
                    />

                    <a href=""><p>Esqueci minha senha</p></a>

                    <Button
                        text={"Entrar"}
                    />
                </div>

                <p>Ainda não tem uma conta? <a href="">Criar Conta</a></p>

                <div>
                    <div className="previa-footer">
                        <div >
                            <img src="" alt="" />
                            <h6>Explore livros</h6>
                            <p>Encontre novas leituras incriveis</p>
                        </div>
                        <div>
                            <img src="" alt="" />
                            <h6>Conecte-se</h6>
                            <p>Participe de clibes e discussões</p>
                        </div>
                        <div>
                            <img src="" alt="" />
                            <h6>Descubra lugares</h6>
                            <p>Encontre lugares incriveis para ler </p>
                        </div>
                    </div>
                    <footer>2026 <span>ConectaBook</span>. Todos os direitos reservados.</footer>
                </div>

            </div>
        </main>

    )
}

export default Login