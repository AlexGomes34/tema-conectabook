import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

import userDefault from "../../assets/userDefault.webp"

export default function Postagem({ post }) {

    return (
        <div className="postagem">

            <img src={post.foto_perfil || userDefault} alt="" />

            <div className="postagem-text">

                <div className="info-post">
                    <h3>{post.nome_usuario}</h3>
                </div>

                <p>{post.comentario}</p>

                <div className="reacoes">

                    <div className="reacao">
                        <FontAwesomeIcon icon={faHeart} />
                        <p>0</p>
                    </div>

                    <div className="reacao">
                        <FontAwesomeIcon icon={faComment} />
                        <p>0</p>
                    </div>

                </div>

            </div>

        </div>
    )
}