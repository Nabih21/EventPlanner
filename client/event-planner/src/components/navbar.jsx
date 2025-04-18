import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/api';
import styles from './Navbar.module.css';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';






const Navbar = ({ setUser, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  // const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check if user is logged in
    const token1 = localStorage.getItem('token');
    console.log("Token from local storage:", token1);
    setIsLoggedIn(!!token1);
    setToken(token1);
    

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/venues', label: 'Venues' },
    { path: '/users', label: 'Other People' },
  ];

  async function fetchUserData() {
    try {
        const response = await axios.get('http://localhost:3001/auth/getUser', {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        console.log('User:', response.data.User);
        return response.data.User; 
    } catch (error) {
        console.error('Error fetching user:', error.response?.data?.Error || error.message);
        return null;
    }
}

  useEffect(() => {
    console.log("User token:", token);
    
    if (isLoggedIn) {
      fetchUserData().then((userData) => {
        if (userData) {
          console.log('User data:', userData);  
          setUser(userData);
        }
      });
    }
    if (user != null) {

      console.log("Username :", user.username);
    }
}, [token]);

useEffect(() => {
    console.log("User data:", user);
    if (user != null) {
      console.log("Username :", user.username);
    }
} , [user]);


  return (
    <motion.nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TIME Is Managing Events
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${
                location.pathname === link.path ? styles.active : ''
              }`}
            >
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.span>
            </Link>
          ))}

        <div className={styles.desktopNav}>
          {user != null  && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}> 
                      <FaUserCircle size={30} color="#2b5876" />
                        <span>
                          Hi {user.username} 
                          </span>
                      </div> 
                    )  }

        </div>


          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoggedIn ? (
              <button onClick={handleLogout} className={styles.loginButton}>
                Logout
              </button>
            ) : (
              <Link to="/auth?type=login" className={styles.loginButton}>
                Sign In
              </Link>
            )}
          </motion.div>

        
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`} />
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={styles.mobileNav}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${styles.mobileNavLink} ${
                    location.pathname === link.path ? styles.active : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }} 
                  className={styles.mobileLoginButton}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth?type=login"
                  className={styles.mobileLoginButton}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;