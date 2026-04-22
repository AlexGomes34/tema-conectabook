// import './style.css'
// import logo from './logo.png';
import logo from '../../assets/logo.png'

function headerHome() {

    return(
        <header className='headerHome'>
            <img className='logo' src={logo} alt="" />
            <div className="links">
                <a className='entrar' href="#">Entrar</a>
                <a href="#">Cadastrar</a>
            </div>
        </header>
    )
}

export default headerHome

