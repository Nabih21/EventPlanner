import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Events from './pages/Events';
import Venues from './pages/Venues';
import EventDetails from './pages/EventDetails';
import EventOrganizer from "./pages/EventOrganizer";
import OrganizerEventDetails from './pages/OrganizerEventDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/eventOrganizer" element={<EventOrganizer />} />
            <Route path="/organizerEventDetails/:id" element={<OrganizerEventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
