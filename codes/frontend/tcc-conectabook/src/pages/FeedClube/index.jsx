import Button from "../../components/button";
import Header from "../../components/header";
import Footer from "../../components/footer";

import Input from "../../components/input/index.jsx"

import fotoPessoa1 from "../../assets/fotoPessoa1.jpg"
import fotoClube1 from "../../assets/fotoClube1.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

import "./style.css"

import { useEffect, useState } from "react";

export default function FeedClube() {

    const [user, setUser] = useState(null)

    useEffect(() => {

        const userStorage = JSON.parse(
            localStorage.getItem("user")
        )

        if (userStorage) {
            setUser(userStorage)
        }

    }, [])

    const navigate = useNavigate()
    return (
        
        <div className="feedClube-container">
            <Header fotoUser={user?.user?.foto_perfil} />
            <main className="main-container">
                <div className="up-main">
                    <div className="up-left-main">
                        <Button text="Feed" />
                        <Button text="Membros" />
                    </div>
                    <Button onClick={() => navigate("/editarClube")} text="Editar" />
                </div>
                <div className="main-feedClube">
                    <div className="left-main">
                        <div className="titulo-left-main">
                            <h2>Amantes de Percy Jackson</h2>
                            <p>320 membros</p>
                        </div>

                        <div className="input-postagem">
                            <div className="inputComFoto">
                                <img src={fotoPessoa1} alt="" />
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
                            <img src={fotoPessoa1} alt="" />

                            <div className="postagem-text">
                                <div className="info-post">
                                    <h3>Raissa Soares</h3>
                                    {/* <span>O pequeno principe</span> */}
                                </div>

                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit obcaecati libero earum illo maxime qui, dignissimos assumenda blanditiis exercitationem. Sint accusamus eius, at vero nisi tempore earum quisquam error commodi. Commodi rem nulla debitis! Inventore sunt ex voluptates? Ullam commodi adipisci voluptatem repellat necessitatibus possimus quas asperiores voluptate consequuntur, ad aut iste voluptatum fuga quo sequi incidunt ipsa eveniet, tempora sapiente vitae tenetur nemo qui. Officiis harum, est nisi sed saepe accusamus aperiam impedit maiores voluptatem ex repellendus distinctio cumque omnis hic culpa fugit atque soluta? Temporibus, consequuntur molestiae! Vero harum, ipsum eius nobis laborum nisi et numquam. Sed.</p>
                                <div className="reacoes">
                                    <div className="reacao">
                                        <FontAwesomeIcon icon={faHeart} />
                                        <p>24</p>
                                    </div>
                                    <div className="reacao">
                                        <FontAwesomeIcon icon={faComment} />
                                        <p>7</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="postagem">
                            <img src={fotoPessoa1} alt="" />

                            <div className="postagem-text">
                                <div className="info-post">
                                    <h3>Raissa Soares</h3>
                                    {/* <span>O pequeno principe</span> */}
                                </div>

                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit obcaecati libero earum illo maxime qui, dignissimos assumenda blanditiis exercitationem. Sint accusamus eius, at vero nisi tempore earum quisquam error commodi. Commodi rem nulla debitis! Inventore sunt ex voluptates? Ullam commodi adipisci voluptatem repellat necessitatibus possimus quas asperiores voluptate consequuntur, ad aut iste voluptatum fuga quo sequi incidunt ipsa eveniet, tempora sapiente vitae tenetur nemo qui. Officiis harum, est nisi sed saepe accusamus aperiam impedit maiores voluptatem ex repellendus distinctio cumque omnis hic culpa fugit atque soluta? Temporibus, consequuntur molestiae! Vero harum, ipsum eius nobis laborum nisi et numquam. Sed.</p>
                                <div className="reacoes">
                                    <div className="reacao">
                                        <FontAwesomeIcon icon={faHeart} />
                                        <p>24</p>
                                    </div>
                                    <div className="reacao">
                                        <FontAwesomeIcon icon={faComment} />
                                        <p>7</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="postagem">
                            <img src={fotoPessoa1} alt="" />

                            <div className="postagem-text">
                                <div className="info-post">
                                    <h3>Raissa Soares</h3>
                                    {/* <span>O pequeno principe</span> */}
                                </div>

                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit obcaecati libero earum illo maxime qui, dignissimos assumenda blanditiis exercitationem. Sint accusamus eius, at vero nisi tempore earum quisquam error commodi. Commodi rem nulla debitis! Inventore sunt ex voluptates? Ullam commodi adipisci voluptatem repellat necessitatibus possimus quas asperiores voluptate consequuntur, ad aut iste voluptatum fuga quo sequi incidunt ipsa eveniet, tempora sapiente vitae tenetur nemo qui. Officiis harum, est nisi sed saepe accusamus aperiam impedit maiores voluptatem ex repellendus distinctio cumque omnis hic culpa fugit atque soluta? Temporibus, consequuntur molestiae! Vero harum, ipsum eius nobis laborum nisi et numquam. Sed.</p>
                                <div className="reacoes">
                                    <div className="reacao">
                                        <FontAwesomeIcon icon={faHeart} />
                                        <p>24</p>
                                    </div>
                                    <div className="reacao">
                                        <FontAwesomeIcon icon={faComment} />
                                        <p>7</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="postagem">
                            <img src={fotoPessoa1} alt="" />

                            <div className="postagem-text">
                                <div className="info-post">
                                    <h3>Raissa Soares</h3>
                                    {/* <span>O pequeno principe</span> */}
                                </div>

                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit obcaecati libero earum illo maxime qui, dignissimos assumenda blanditiis exercitationem. Sint accusamus eius, at vero nisi tempore earum quisquam error commodi. Commodi rem nulla debitis! Inventore sunt ex voluptates? Ullam commodi adipisci voluptatem repellat necessitatibus possimus quas asperiores voluptate consequuntur, ad aut iste voluptatum fuga quo sequi incidunt ipsa eveniet, tempora sapiente vitae tenetur nemo qui. Officiis harum, est nisi sed saepe accusamus aperiam impedit maiores voluptatem ex repellendus distinctio cumque omnis hic culpa fugit atque soluta? Temporibus, consequuntur molestiae! Vero harum, ipsum eius nobis laborum nisi et numquam. Sed.</p>
                                <div className="reacoes">
                                    <div className="reacao">
                                        <FontAwesomeIcon icon={faHeart} />
                                        <p>24</p>
                                    </div>
                                    <div className="reacao">
                                        <FontAwesomeIcon icon={faComment} />
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
                                <img src={fotoPessoa1} alt="" />
                                <p>Batata123</p>
                            </div>
                            <div className="adm">
                                <img src={fotoPessoa1} alt="" />
                                <p>Chiclete com banana</p>
                            </div>
                            <div className="adm">
                                <img src={fotoPessoa1} alt="" />
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
            </main>

            <Footer />
        </div>
    )
}