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
            fotoUser = {user?.foto}
            />
            <h1>Olá {user?.username}</h1>
            <p>Este é você</p>
            <img className="img-user" src={user?.foto} alt="Foto do usuário"/>
        </div>

    )
}

export default Feed