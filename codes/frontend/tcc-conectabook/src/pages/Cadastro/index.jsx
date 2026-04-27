import logo from "../../assets/logo.png"

CADASTRO_DATA = [
    {id:1, label:"Nome de Usuário", placeholder:"Digite seu usuário...", value:username, onChange:{}, type: "text" },
    {id:2, label:"Nome Completo", placeholder:"Digite seu nome...", value:nome, onChange:{}, type: "text" },
    {id:3, label:"E-mail", placeholder:"Digite seu e-mail...", value:email, onChange:{}, type: "email" },
    {id:4, label:"Senha", placeholder:"Digite sua senha...", value:senha, onChange:{}, type: "password" },
    {id:5, label:"Data de Nascimento", value:dateNasc, onChange:{}, type: "data" },
]

function Cadastro(){
    return(
        <div>
            <header className="header-cadastro">
                <img src={logo} alt="Logo ConectaBook" />
            </header>
            <main className="main-cadastro">

            </main>
            <footer className="footer-cadastro">

            </footer>
        </div>
    )
}

export default Cadastro