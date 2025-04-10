import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Events from './pages/Events';
import Venues from './pages/Venues';
import EventDetails from './pages/EventDetails';
import './App.css';
import LiveChat from './components/LiveChat';

function App() {

  const [isLogin,setLogin] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("token") != null){
      setLogin(true);
    }
  },[])
  return (

    <>
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
    {isLogin && <LiveChat/>}
    </>

    
  );
}

export default App;
