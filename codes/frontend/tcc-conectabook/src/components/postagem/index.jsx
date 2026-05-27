import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';


export default function Postagem({ post }) {
    return (
        <div className="postagem">
            <img src={post.foto} alt="" />

            <div className="postagem-text">
                <div className="info-post">
                    <h3>{post.nome}</h3>
                </div>

                <p>{post.postagem}</p>

                <div className="reacoes">
                    <div className="reacao">
                        <FontAwesomeIcon icon={faHeart} />
                        <p>{post.curtidas}</p>
                    </div>

                    <div className="reacao">
                        <FontAwesomeIcon icon={faComment} />
                        <p>{post.comentarios}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}