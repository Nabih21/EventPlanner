import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import Events from './pages/Events';
import Venues from './pages/Venues';
import EventDetails from './pages/EventDetails';

import './App.css';

function App() {
const [user, setUser] = useState(null);

  return (
    <Router>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
