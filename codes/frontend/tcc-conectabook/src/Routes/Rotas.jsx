import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/index.jsx'
import Home from '../pages/Home/index.jsx'
import Cadastro from '../pages/Cadastro/index.jsx'
import Feed from '../pages/feed/index.jsx'
import Perfil from '../pages/Perfil/index.jsx'
import Clube from '../pages/Clube/index.jsx'
import CriarClube from '../pages/CriarClube/criarClube.jsx'
import FeedClube from '../pages/FeedClube/index.jsx'
import EditarClube from '../pages/EditarClube/index.jsx'

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element ={<Home/>}/>
                <Route path='/login' element ={<Login/>}/>
                <Route path='/cadastro' element ={<Cadastro/>}/>
                <Route path='/feed' element ={<Feed/>}/>
                <Route path='/perfil' element ={<Perfil/>}/>
                <Route path='/clube' element ={<Clube/>}/>
                <Route path='/criarClube' element ={<CriarClube/>}/>
                <Route path='/editarClube' element ={<EditarClube/>}/>
                <Route path='/feedClube' element ={<FeedClube/>}/>
                <Route path='*' element ={<h1>Not Found</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas