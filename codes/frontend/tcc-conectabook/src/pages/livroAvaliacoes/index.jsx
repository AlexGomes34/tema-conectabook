import Button from "../../components/button";
import Footer from "../../components/footer";
import Header from "../../components/header";
import LivroTitulosSemelhantes from "../../components/livroTitulosSemelhantes";

import fotoLivro1 from "../../assets/fotoLivro1.jpg"

import fotoPessoa1 from "../../assets/fotoPessoa1.jpg"

import styles from "./style.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTags, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

export default function livroAvaliacao() {
    return (
        <div>
            <Header />
            <main>
                <div>
                    <img src={fotoLivro1} alt="" />
                    <div className={styles.infosLivro}>
                        <div className={styles.infoLivro}>
                            <FontAwesomeIcon className={styles.icone} icon={faStar} size="lg" />
                            <div >
                                <p>Média</p>
                                <p>4.5</p>
                            </div>
                        </div>
                        <div className={styles.infoLivro}>
                            <FontAwesomeIcon className={styles.icone} icon={faTags} size="lg" />
                            <div>
                                <p>Classificação</p>
                                <p>Bem avaliado</p>
                            </div>
                        </div>
                        <div className={styles.infoLivro}>
                            <FontAwesomeIcon className={styles.icone} icon={faPeopleGroup} size="lg" />
                            <div>
                                <p>Avaliações</p>
                                <p>5302</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.livroTitulo}>
                        <div >
                            <h1>1984</h1>
                            <p>George Orwell</p>
                        </div>
                        <Button text={"Publicar"} />
                    </div>
                    <div className={styles.users}>
                        <div className={styles.user}>
                            <div className={styles.userPost}>
                                <img src={fotoPessoa1} alt="" />
                                <p>Jonas Bernardo</p>
                            </div>

                            <div>

                                <div>
                                    <i></i>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nobis saepe corporis tempora ab temporibus reiciendis? Nulla iusto id quos ipsum atque officia asperiores, dignissimos voluptatibus, suscipit, quaerat esse facere.</p>

                            </div>

                        </div>
                        <div className={styles.user}>
                            <div className={styles.userPost}>
                                <img src={fotoPessoa1} alt="" />
                                <p>Jonas Bernardo</p>
                            </div>

                            <div>
                                <div>
                                    <i></i>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sed aperiam quia, facere illum quisquam explicabo ipsam id, reiciendis a blanditiis quibusdam sapiente qui. Cumque quo magni culpa earum nobis!</p>

                            </div>

                        </div >
                        <div className={styles.user}>
                            <div className={styles.userPost}>
                                <img src={fotoPessoa1} alt="" />
                                <p>Jonas Bernardo</p>
                            </div>

                            <div>

                                <div>
                                    <i></i>
                                </div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui ipsam consectetur aliquid iusto alias, tenetur eaque voluptas placeat quas quidem, dolore accusamus optio debitis suscipit minus reiciendis tempora omnis deserunt?</p>

                            </div>

                        </div>
                    </div>
                </div>
            </main>


            <LivroTitulosSemelhantes />
            <Footer />
        </div>
    )
}