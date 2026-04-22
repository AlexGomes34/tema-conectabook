import './header.css'
import logo from '../assets/logo.png';
import user from '../assets/user.png';

function Header (){

    return(
        <header className='headerPage'>
            <img className='logo' src={logo} alt="logo" />
            <a className='a' href="#">Clube de Leitura</a>
            <a className='a' href="#">Livros</a>
            <a className='a' href="#">Feed</a>
            <a className='a' href="#">Cafeteria</a>
            <a className='a' href="#">Eventos</a>
            <a className='user' href=""><img src={user} alt="" /></a>
        </header>
    )
}

export default Header