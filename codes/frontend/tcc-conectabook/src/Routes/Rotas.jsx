import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/index.jsx'
import Home from '../pages/Home/index.jsx'

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element ={<Home/>}/>
                <Route path='/login' element ={<Login/>}/>
                <Route path='*' element ={<h1>Not Found</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas