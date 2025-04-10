import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/api';
import { FiUser, FiMail, FiEdit2, FiLogOut } from 'react-icons/fi';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await authService.getCurrentUser();
        setUser(userData);
        
        setFormData({
          username: userData.username || '',
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile');
        setLoading(false);
        
        // Redirect to login if not authenticated
        if (error.response?.status === 401) {
          navigate('/auth?type=login');
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Update the user profile - this would need to be implemented in the API service
      // await authService.updateProfile(formData);
      
      // For now, just update the local state to simulate the change
      setUser({
        ...user,
        ...formData
      });
      
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/auth?type=login');
  };

  if (loading && !user) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.loadingContainer}>
          <motion.div 
            className={styles.loadingSpinner}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading profile...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.profileContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.profileCard}>
        <motion.div 
          className={styles.profileHeader}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>My Profile</h1>
          {!isEditing && (
            <motion.button 
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEdit2 /> Edit Profile
            </motion.button>
          )}
        </motion.div>
        
        {error && (
          <motion.div 
            className={styles.errorMessage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {!isEditing ? (
          <motion.div 
            className={styles.profileInfo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                <FiUser size={40} />
              </div>
            </div>
            
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <FiUser className={styles.infoIcon} />
                <div>
                  <h3>Username</h3>
                  <p>{user?.username || 'Not specified'}</p>
                </div>
              </div>
              
              {user?.email && (
                <div className={styles.infoItem}>
                  <FiMail className={styles.infoIcon} />
                  <div>
                    <h3>Email</h3>
                    <p>{user.email}</p>
                  </div>
                </div>
              )}
            </div>
            
            <motion.button 
              className={styles.logoutButton}
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLogOut /> Log Out
            </motion.button>
          </motion.div>
        ) : (
          <motion.form 
            className={styles.profileForm}
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Add more fields as needed */}
            
            <div className={styles.formActions}>
              <motion.button 
                type="button" 
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button 
                type="submit" 
                className={styles.saveButton}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
};

export default Profile; 