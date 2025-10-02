import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './layout/Home'
import Tarjeta from './layout/Tarjeta'
import { Fragment } from 'react'
import Personas from './layout/Personas'
function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tarjeta' element={<Tarjeta/>}/>
      <Route path='/tarjeta/:id' element={<Tarjeta/>}/>
      <Route path='/personas' element={<Personas/>}/>
    </Routes>
  )
}

export default App
