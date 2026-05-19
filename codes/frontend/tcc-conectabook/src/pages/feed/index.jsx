import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header/index"
import './style.css'

function Feed() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("user"))

        if (!userStorage) {
            navigate("/")
        } else {
            setUser(userStorage)
        }
    }, [])

    return (
        <div>
            <Header
            fotoUser = {user?.user?.foto_perfil}
            />
            <h1>Olá {user?.user.nome_usuario}</h1>
        </div>

    )
}

export default Feed