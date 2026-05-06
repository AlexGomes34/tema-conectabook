import './header.css'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Header({ fotoUser }) {

    return (
        <header className='headerPage'>
            <img className='logo' src={logo} alt="logo" />
            <a className='a' href="#">Clube de Leitura</a>
            <a className='a' href="#">Livros</a>
            <a className='a' href="#">Feed</a>
            <a className='a' href="#">Cafeteria</a>
            <a className='a' href="#">Eventos</a>
            <Link to={"/perfil"} className='user' href="">
                <img className='fotoUser' src={fotoUser} alt="" />
            </Link>
        </header>
    )
}

export default Header