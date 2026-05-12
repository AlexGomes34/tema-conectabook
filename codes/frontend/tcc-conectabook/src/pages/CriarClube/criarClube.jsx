import Footer from "../../components/footer";
import Header from "../../components/header";
import Button from "../../components/button";
import Input from "../../components/input";

import "./style.css"

const INPUT_DATA = [
    { id: 1, name: "nomeClube", label: "Nome do Clube", placeholder: "Digite o nome do clube...", type: "text", required: true },
    { id: 2, name: "sobre", label: "Sobre", placeholder: "Descreva o clube...", type: "text", required: true },
    { id: 3, name: "regras", label: "Regras", placeholder: "Descreva as regras do clube...", type: "email", required: true },
]

export default function CriarClube() {

    return (
        <div className="container-criarClube">
            <Header />
            <main className="main-criarClube">
                <div className="criarClube-card">

                    <form className="formulario-criarClube" action="">
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
                                    />

                                    <label htmlFor="foto" className="upload-label">
                                        +
                                    </label>
                                </div>

                                <div className="comboBox">
                                    <h2>Genero</h2>
                                    <select name="" id="">
                                        <option value="">Selecione uma opção</option>
                                        <option value="acao">Ação</option>
                                        <option value="terror">Terror</option>
                                        <option value="aventura">Aventura</option>
                                    </select>
                                </div>

                            </div>

                            <div className="right-criarClube">
                                {INPUT_DATA.map((input) => (
                                    <Input
                                        id={input.id}
                                        name={input.name}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        value={input.value}
                                        onChange={""}
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