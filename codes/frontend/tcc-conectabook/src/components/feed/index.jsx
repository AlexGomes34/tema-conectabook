import Button from "../button";
import Input from "../input";

import Postagem from "../postagem";

import userDefault from "../../assets/userDefault.webp"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeftFeed({ posts, idConversa, idClube, feedUrl }) {

    const [user, setUser] = useState({})
    const [mensagem, setMensagem] = useState("")
    const [listaPosts, setListaPosts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("user"))

        if (!userStorage) {
            navigate("/")
        } else {
            setUser(userStorage)
            console.log(user)
        }
    }, [])

    useEffect(() => {
        carregarPosts()
    }, [])

    async function carregarPosts() {
        try {
            const response = await fetch(feedUrl)
            const data = await response.json()
            console.log(data)
            setListaPosts(data.response)
        } catch (error) {
            console.log(error)
        }
    }

    async function handlePost() {

        if (mensagem.trim() === "") {
            return
        }

        const body = {
            comentario: mensagem,
            arquivo: null,
            id_usuario: user.user.id,
            id_clube: idClube ?? null,
            id_mensagem_pai: idConversa,
        }

        try {
            const response = await fetch("http://localhost:8080/v1/conectaBook/mensagem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const data = await response.json()

            if (response.ok) {
                setMensagem("")
                await carregarPosts()
            }

            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="left-main">

            <form
                className="input-postagem"
                onSubmit={(e) => {
                    e.preventDefault()
                    handlePost()
                }}
            >
                <div className="inputComFoto">
                    <img src={userDefault} alt="" />
                    <Input
                        placeholder="O que está pensando?"
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                    />
                </div>

                <div className="inputComArquivo">
                    <Button text="Arquivo" />
                    <Button
                        text="Postar"
                        type="submit"
                    />
                </div>

            </form>

            {listaPosts.map((post) => (
                <Postagem
                    key={post.id}
                    post={post}
                    idClube={idClube ?? null}
                />
            ))}

        </div>
    )
}