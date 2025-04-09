import './App.css'
import { NavBar } from './components/navbar'
import Home from './pages/home'
import Auth from './pages/auth'
import Events from "./pages/Events";
import Venues from "./pages/Venues";
import EventDetails from "./pages/EventDetails";
import EventOrganizer from "./pages/EventOrganizer";
import OrganizerEventDetails from './pages/OrganizerEventDetails';
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
            <Route path="/venues" element={<Venues />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/eventOrganizer" element={<EventOrganizer />} />
            <Route path="/organizerEventDetails/:id" element={<OrganizerEventDetails />} />
          </Routes>
      </Router>
     
    </div>
  )
}

export default App
