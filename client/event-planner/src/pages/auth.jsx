import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaUserShield, FaArrowLeft } from 'react-icons/fa';
import Login from '../components/Login';
import UserSignup from '../components/UserSignup';
import AdminSignup from '../components/AdminSignup';
import styles from './Auth.module.css';

const Auth = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [authMode, setAuthMode] = useState(searchParams.get('type') || 'login');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const renderAuthForm = () => {
    switch (authMode) {
      case 'login':
        return (
          <Login 
            switchToSignup={() => setAuthMode('signup')} 
            switchToAdminSignup={() => setAuthMode('adminSignup')} 
          />
        );
      case 'signup':
        return <UserSignup switchToLogin={() => setAuthMode('login')} />;
      case 'adminSignup':
        return <AdminSignup switchToLogin={() => setAuthMode('login')} />;
      default:
        return (
          <Login 
            switchToSignup={() => setAuthMode('signup')} 
            switchToAdminSignup={() => setAuthMode('adminSignup')} 
          />
        );
    }
  };

  const getAuthTitle = () => {
    switch (authMode) {
      case 'login':
        return 'Welcome Back';
      case 'signup':
        return 'Create Account';
      case 'adminSignup':
        return 'Admin Registration';
      default:
        return 'Welcome';
    }
  };

  const getAuthSubtitle = () => {
    switch (authMode) {
      case 'login':
        return 'Sign in to access your account';
      case 'signup':
        return 'Join our community of event planners';
      case 'adminSignup':
        return 'Register as an administrator';
      default:
        return 'Sign in to your account';
    }
  };

  const getAuthIcon = () => {
    switch (authMode) {
      case 'login':
        return <FaUser className={styles.authIcon} />;
      case 'signup':
        return <FaUser className={styles.authIcon} />;
      case 'adminSignup':
        return <FaUserShield className={styles.authIcon} />;
      default:
        return <FaUser className={styles.authIcon} />;
    }
  };

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.authBackground}>
        <div className={styles.authBackgroundShape}></div>
        <div className={styles.authBackgroundShape}></div>
        <div className={styles.authBackgroundShape}></div>
      </div>
      
      <motion.div 
        className={styles.authContainer}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        <motion.div className={styles.authCard} variants={itemVariants}>
          <div className={styles.authHeader}>
            <motion.div 
              className={styles.authIconContainer}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {getAuthIcon()}
            </motion.div>
            <motion.h1 
              className={styles.authTitle}
              variants={itemVariants}
            >
              {getAuthTitle()}
            </motion.h1>
            <motion.p 
              className={styles.authSubtitle}
              variants={itemVariants}
            >
              {getAuthSubtitle()}
            </motion.p>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={authMode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderAuthForm()}
            </motion.div>
          </AnimatePresence>
          
          <motion.div 
            className={styles.authFooter}
            variants={itemVariants}
          >
            <a href="/" className={styles.backToHome}>
              <FaArrowLeft /> Back to Home
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;