import './header.css'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Header({ fotoUser }) {

    return (
        <header className='headerPage'>
            <img className='logo' src={logo} alt="logo" />
            <Link className='a' to="/clube">Clube de Leitura</Link>
            <Link className='a' to="/livros">Livros</Link>
            <Link className='a' to="/feed">Feed</Link>
            <Link className='a' to="/cafeteria">Cafeteria</Link>
            <Link to={"/eventos"} className='a' href="">Eventos</Link>
            <Link to={"/perfil"} className='user'>
                <img className='fotoUser' src={fotoUser} alt="" />
            </Link>
        </header>
    )
}

export default Header