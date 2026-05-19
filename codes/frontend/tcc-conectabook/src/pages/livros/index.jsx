import Input from "../../components/input"
import styles from "./style.module.css"

import Header from "../../components/header/index.jsx"
import Footer from "../../components/footer/index.jsx"

import fotoLivro1 from "../../assets/fotoLivro1.jpg"

export default function Livro() {
    return (
        <div>
            <Header />
            <div className={styles.main}>
                <div className={styles.upMain}>
                    <div className={styles.upMainLeft}>
                        <h2>Descubra seu próximo livro</h2>
                        <p>Encontre histórias, conecte-se com leitores e transforme sua leitura em algo ainda mais especial.</p>
                    </div>
                    <div className={styles.upMainRight}>
                        <Input />
                        <select name="" id="">
                            <option value="">Selecione</option>
                        </select>
                    </div>
                </div>
                <div className={styles.livros}>
                    <h3>Livros em destaque</h3>
                    <p>Ver todos</p>
                    <div className={styles.listLivros}>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                    </div>
                </div>
                <div className={styles.livros}>
                    <h3>Minha estante</h3>
                    <p>Ver todos</p>
                    <div className={styles.listLivros}>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                        <div className={styles.livro}>
                            <img src={fotoLivro1} alt="" />
                            <h4>O pequeno príncipe</h4>
                            <p>Autor do livro</p>
                            <p>4.63</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}