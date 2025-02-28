import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavBar } from './components/navbar'
import Home from './pages/home'
import Auth from './pages/auth'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Router> 
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
      </Router>
     
    </div>
  )
}

export default App
