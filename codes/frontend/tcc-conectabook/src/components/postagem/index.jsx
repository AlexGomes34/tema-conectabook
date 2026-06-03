import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

import userDefault from "../../assets/userDefault.webp"

import { useState } from 'react';
import Input from '../input';

import "./style.css"

export default function Postagem({ post }) {

    const [abrirComentario, setAbrirComentario] = useState(false)
    const [comentario, setComentario] = useState("")
    const [comentarios, setComentarios] = useState([])
    const [comentarioRespondendo, setComentarioRespondendo] = useState(null)
    const [textoResposta, setTextoResposta] = useState("")
    const [respostaRespondendo, setRespostaRespondendo] = useState(null)
    const [textoSubResposta, setTextoSubResposta] = useState("")

    async function responderResposta(idRespostaPai, idComentarioPai) {

        if (!textoSubResposta.trim()) return

        try {

            const user = JSON.parse(localStorage.getItem("user"))

            const body = {
                comentario: textoSubResposta,
                id_usuario: user.user.id,
                id_conversa: 2,
                id_mensagem_pai: idRespostaPai
            }

            const response = await fetch(
                "http://localhost:8080/v1/conectaBook/mensagem",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const data = await response.json()

            if (data.response) {

                setComentarios((prev) =>
                    prev.map((comentario) => {

                        if (comentario.id_mensagem === idComentarioPai) {

                            return {

                                ...comentario,

                                respostas: comentario.respostas.map((resposta) => {

                                    if (resposta.id_mensagem === idRespostaPai) {

                                        return {

                                            ...resposta,

                                            respostas: [
                                                ...(resposta.respostas || []),

                                                {
                                                    ...data.response,
                                                    nome_usuario: user.user.nome,
                                                    foto_perfil: user.user.foto_perfil
                                                }
                                            ]
                                        }

                                    }

                                    return resposta

                                })

                            }

                        }

                        return comentario

                    })
                )

            }

            setTextoSubResposta("")
            setRespostaRespondendo(null)

        } catch (error) {

            console.log(error)

        }

    }

    async function responderComentario(idComentarioPai) {

        if (!textoResposta.trim()) return

        try {

            const user = JSON.parse(localStorage.getItem("user"))

            const body = {
                comentario: textoResposta,
                id_usuario: user.user.id,
                id_conversa: 2,
                id_mensagem_pai: idComentarioPai
            }

            const response = await fetch(
                "http://localhost:8080/v1/conectaBook/mensagem",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const data = await response.json()

            console.log(data.response)

            if (data.response) {

                setComentarios((prev) =>
                    prev.map((comentario) => {

                        if (comentario.id_mensagem === idComentarioPai) {

                            return {
                                ...comentario,
                                respostas: [
                                    ...(comentario.respostas || []),
                                    {
                                        ...data.response,
                                        nome_usuario: user.user.nome,
                                        foto_perfil: user.user.foto_perfil
                                    }
                                ]
                            }

                        }

                        return comentario

                    })
                )

            }

            setTextoResposta("")
            setComentarioRespondendo(null)

        } catch (error) {
            console.log(error)
        }
    }

    async function buscarComentarios() {

        try {

            const response = await fetch(
                `http://localhost:8080/v1/conectaBook/mensagem/${post.id_mensagem}/respostas`
            )

            const data = await response.json()

            const comentariosPai = []
            const respostas = []

            data.response.forEach((item) => {

                if (item.id_mensagem_pai === post.id_mensagem) {

                    comentariosPai.push({
                        ...item,
                        respostas: []
                    })

                } else {

                    respostas.push(item)

                }

            })

            respostas.forEach((resposta) => {

                const comentarioPai = comentariosPai.find(
                    (comentario) =>
                        comentario.id_mensagem === resposta.id_mensagem_pai
                )

                if (comentarioPai) {
                    comentarioPai.respostas.push(resposta)
                }

            })

            setComentarios(comentariosPai)

        } catch (error) {

            console.log(error)

        }
    }

    async function criarComentario() {

        if (!comentario.trim()) return

        try {

            const user = JSON.parse(localStorage.getItem("user"))

            const body = {
                comentario: comentario,
                id_usuario: user.user.id,
                id_conversa: 2,
                id_mensagem_pai: post.id_mensagem
            }

            console.log(body)
            console.log(user)

            const response = await fetch(
                "http://localhost:8080/v1/conectaBook/mensagem",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const data = await response.json()

            console.log(data)

            if (data.response) {

                setComentarios((prev) => [
                    ...prev,
                    {
                        ...data.response,
                        respostas: []
                    }
                ])

            }

            setComentario("")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="postagem">

            <img
                src={post.foto_perfil || userDefault}
                onError={(e) => {
                    e.target.src = userDefault
                }}
                alt=""
            />

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

                    <div
                        className="reacao"
                        onClick={() => {

                            const novoEstado = !abrirComentario

                            setAbrirComentario(novoEstado)

                            if (novoEstado) {
                                buscarComentarios()
                            }

                        }}
                    >
                        <FontAwesomeIcon icon={faComment} />
                        <p>{comentarios.length}</p>
                    </div>

                </div>

                {
                    abrirComentario && (

                        <div className="area-comentarios">

                            <div className="criar-comentario">

                                <Input
                                    type="text"
                                    placeholder="Comente algo..."
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                    onKeyDown={(e) => {

                                        if (e.key === "Enter") {
                                            criarComentario()
                                        }

                                    }}
                                />

                                <button onClick={criarComentario}>
                                    Comentar
                                </button>

                            </div>

                            {
                                comentarios.map((item) => (
                                    <div key={item.id_mensagem}>

                                        <div className="comentario">

                                            <img
                                                src={item.foto_perfil || userDefault}
                                                alt=""
                                            />

                                            <div>

                                                <h3>{item.nome_usuario}</h3>

                                                <p>{item.comentario}</p>

                                                <button
                                                    onClick={() => {

                                                        if (comentarioRespondendo === item.id_mensagem) {
                                                            setComentarioRespondendo(null)
                                                        } else {
                                                            setComentarioRespondendo(item.id_mensagem)
                                                        }

                                                    }}
                                                >
                                                    Responder
                                                </button>

                                            </div>

                                        </div>

                                        {
                                            comentarioRespondendo === item.id_mensagem && (
                                                <div style={{ marginLeft: "40px" }}>

                                                    <Input
                                                        type="text"
                                                        placeholder="Responder comentário..."
                                                        value={textoResposta}
                                                        onChange={(e) =>
                                                            setTextoResposta(e.target.value)
                                                        }
                                                        onKeyDown={(e) => {

                                                            if (e.key === "Enter") {
                                                                responderComentario(item.id_mensagem)
                                                            }

                                                        }}
                                                    />

                                                    <button
                                                        onClick={() =>
                                                            responderComentario(item.id_mensagem)
                                                        }
                                                    >
                                                        Responder
                                                    </button>

                                                </div>
                                            )
                                        }

                                        <div style={{ marginLeft: "40px" }}>

                                            {
                                                item.respostas?.map((resposta) => (

                                                    <div
                                                        key={resposta.id_mensagem}
                                                        className="comentario"
                                                    >

                                                        <img
                                                            src={
                                                                resposta.foto_perfil ||
                                                                userDefault
                                                            }
                                                            alt=""
                                                        />

                                                        <div>

                                                            <h3>{resposta.nome_usuario}</h3>

                                                            <p>{resposta.comentario}</p>

                                                            <div className="reacoes">

                                                                <button
                                                                    onClick={() => {

                                                                        if (respostaRespondendo === resposta.id_mensagem) {

                                                                            setRespostaRespondendo(null)

                                                                        } else {

                                                                            setRespostaRespondendo(resposta.id_mensagem)

                                                                        }

                                                                    }}
                                                                >
                                                                    Responder
                                                                </button>

                                                            </div>

                                                            {
                                                                respostaRespondendo === resposta.id_mensagem && (

                                                                    <div>

                                                                        <Input
                                                                            type="text"
                                                                            placeholder="Responder resposta..."
                                                                            value={textoSubResposta}
                                                                            onChange={(e) =>
                                                                                setTextoSubResposta(e.target.value)
                                                                            }
                                                                            onKeyDown={(e) => {

                                                                                if (e.key === "Enter") {

                                                                                    responderResposta(
                                                                                        resposta.id_mensagem,
                                                                                        item.id_mensagem
                                                                                    )

                                                                                }

                                                                            }}
                                                                        />

                                                                        <button
                                                                            onClick={() =>
                                                                                responderResposta(
                                                                                    resposta.id_mensagem,
                                                                                    item.id_mensagem
                                                                                )
                                                                            }
                                                                        >
                                                                            Responder
                                                                        </button>

                                                                    </div>

                                                                )
                                                            }

                                                            <div style={{ marginLeft: "40px" }}>

                                                                {
                                                                    resposta.respostas?.map((subResposta) => (

                                                                        <div
                                                                            key={subResposta.id_mensagem}
                                                                            className="comentario"
                                                                        >

                                                                            <img
                                                                                src={
                                                                                    subResposta.foto_perfil ||
                                                                                    userDefault
                                                                                }
                                                                                alt=""
                                                                            />

                                                                            <div>

                                                                                <h3>{subResposta.nome_usuario}</h3>

                                                                                <p>{subResposta.comentario}</p>

                                                                            </div>

                                                                        </div>

                                                                    ))
                                                                }

                                                            </div>

                                                        </div>

                                                    </div>

                                                ))
                                            }

                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    )
                }

            </div>

        </div>
    )
}