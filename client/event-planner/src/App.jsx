import './App.css'
import { NavBar } from './components/navbar'
import Home from './pages/home'
import Auth from './pages/auth'
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'


function App() {  

  return (
    <div className='App'>
      <Router> 
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
      </Router>
     
    </div>
  )
}

export default App
