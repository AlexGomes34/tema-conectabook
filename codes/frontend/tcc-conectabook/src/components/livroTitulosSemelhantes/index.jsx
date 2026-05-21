import styles from "./style.module.css"

import fotoLivro1 from "../../assets/fotoLivro1.jpg"

const LIVROS_DATA = [
    { id: 1, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.67, imagem: fotoLivro1 },
    { id: 2, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.63, imagem: fotoLivro1 },
    { id: 3, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.80, imagem: fotoLivro1 },
    { id: 4, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.55, imagem: fotoLivro1 },
    { id: 5, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.90, imagem: fotoLivro1 },
    { id: 6, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", avaliacao: 4.70, imagem: fotoLivro1 },
]

export default function LivroTitulosSemelhantes() {

    return (
        <div className={styles.bodyLivro}>
            <div className={styles.titulosSemelhantesText}>
                <p>Titulos Semelhantes</p>
                <p>Ver Todos</p>
            </div>
            <div className={styles.titulosSemelhantes}>
                {LIVROS_DATA.map((livro) => (
                    <div className={styles.tituloSemelhante} key={livro.id}>
                        <img src={livro.imagem} alt="" />
                        <p>{livro.nome}</p>
                        <p>{livro.autor}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}