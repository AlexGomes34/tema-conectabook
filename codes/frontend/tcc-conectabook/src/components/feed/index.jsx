import Button from "../button";
import Input from "../input";

import Postagem from "../postagem";

import fotoPessoa1 from "../../assets/fotoPessoa1.jpg";


export default function LeftFeed({ posts }) {

    return (
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

            {posts.map((post) => (
                <Postagem
                    key={post.id}
                    post={post}
                />
            ))}

        </div>
    )
}