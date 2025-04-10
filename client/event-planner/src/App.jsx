import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
const [user, setUser] = useState(null);

  return (
    <div className="app">
      <Navbar setUser={setUser}  user={user} />
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
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
  );
}

export default App;
