import { useState } from 'react';
import '../App.css';
import Login from '../components/Login';
import UserSignup from '../components/UserSignup';
import AdminSignup from '../components/AdminSignup';

const Auth = () => {
  const [authMode, setAuthMode] = useState('login'); // login, signup, adminSignup

  const renderAuthForm = () => {
    switch (authMode) {
      case 'login':
        return <Login switchToSignup={() => setAuthMode('signup')} switchToAdminSignup={() => setAuthMode('adminSignup')} />;
      case 'signup':
        return <UserSignup switchToLogin={() => setAuthMode('login')} />;
      case 'adminSignup':
        return <AdminSignup switchToLogin={() => setAuthMode('login')} />;
      default:
        return <Login switchToSignup={() => setAuthMode('signup')} switchToAdminSignup={() => setAuthMode('adminSignup')} />;
    }
  };

  return (
    <div className="auth-container">
      <h1>Event Planner Authentication</h1>
      {renderAuthForm()}
    </div>
  );
};

export default Auth;