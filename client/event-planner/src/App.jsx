import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';


import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import Events from './pages/Events';
import Venues from './pages/Venues';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/dashboard';
import CreateEvent from './pages/CreateEvent';

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
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/users" element={<Users />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} /> 
        </Routes>
      </div>
          {isLogin && <LiveChat/>}
    </>

  );
}

export default App;
