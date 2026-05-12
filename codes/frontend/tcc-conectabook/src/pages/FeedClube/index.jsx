import Button from "../../components/button";
import Header from "../../components/header";
import Footer from "../../components/footer";

import Input from "../../components/input/index.jsx"

import "./style.css"

export default function FeedClube() {
    return (
        <div>
            <Header />
            <div className="up-main">
                <div className="up-left-main">
                    <Button text="Feed" />
                    <Button text="Membros" />
                </div>
                <Button text="Editar" />
            </div>
            <div className="main-feedClube">
                <div className="left-main">
                    <div className="titulo-left-main">
                        <h2>Amantes de Percy Jackson</h2>
                        <p>320 membros</p>
                    </div>

                    <div className="input-postagem">
                        <div className="inputComFoto">
                            <img src="" alt="" />
                            <Input
                            placeholder="O que está pensando?"
                            />
                        </div>
                        <div className="inputComArquivo">
                            <Button text="Arquivo" />
                            <Button text="Postar" />
                        </div>
                    </div>

                    <div className="postagem">
                        <img src="" alt="" />

                        <div className="postagem-text">
                            <h3>Raissa Soares</h3>
                            <p>O pequeno principe</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam sit eum quaerat tempore, laborum debitis deleniti accusamus voluptate maxime enim corporis aliquam fugit qui excepturi. Sit officia velit impedit! Quidem!</p>
                            <div className="reacoes">
                                <div className="reacao">
                                    <i></i>
                                    <p>24</p>
                                </div>
                                <div className="reacao">
                                    <i></i>
                                    <p>7</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </div>

                <div className="right-main">
                    <div className="sobre">
                        <h3>Sobre</h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus quo, suscipit repudiandae sit placeat aperiam ipsa quas totam explicabo nobis exercitationem porro est vitae voluptate asperiores enim laudantium ipsam dolore?
                        </p>
                    </div>
                    <div className="administradores">
                        <h3>Administradores</h3>
                        <div className="adm">
                            <img src="" alt="" />
                            <p>Batata123</p>
                        </div>
                        <div className="adm">
                            <img src="" alt="" />
                            <p>Chiclete com banana</p>
                        </div>
                        <div className="adm">
                            <img src="" alt="" />
                            <p>Chipanze de asa</p>
                        </div>
                    </div>
                    <div className="clubesMesmoGenero">
                        <h3>
                            Clubes do mesmo Genero
                        </h3>
                        <div className="clube-diverso">
                            <img src="" alt="" />
                            <div className="titulo-clube-diverso">
                                <p>Mitologia</p>
                                <p>285 membros</p>
                            </div>
                            <Button text="Ver clube" />
                        </div>
                        <div className="clube-diverso">
                            <div className="titulo-clube-diverso">
                                <p>Mitologia</p>
                                <p>285 membros</p>
                            </div>
                            <Button text="Ver clube" />
                        </div>
                        <div className="clube-diverso">
                            <div className="titulo-clube-diverso">
                                <p>Mitologia</p>
                                <p>285 membros</p>
                            </div>
                            <Button text="Ver clube" />
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}