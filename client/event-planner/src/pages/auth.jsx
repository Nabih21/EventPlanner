import { useState } from 'react';
import '../styles/auth.css';
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
      {renderAuthForm()}
    </div>
  );
};

export default Auth;