import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tarjeta from './Tarjeta'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <Tarjeta></Tarjeta>
  )
}

export default App
