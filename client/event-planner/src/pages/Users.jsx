
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaCalendarAlt, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import UserCard from "../components/UserCard";
import styles from "./LandingPage.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all events from your backend
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/auth/viewUsers");
        setUsers(response.data.Users || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter the events by search term and status
  const filteredUsers = users.filter((user) => {
    // Match name or location or description with searchTerm
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase());

    // If statusFilter is empty, it means "show all"
    return matchesSearch;
  });

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
    }
  };

  return (
    <motion.div 
      className={styles.landingContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ paddingTop: '80px' }} // Add padding to account for fixed navbar
    >
      <div className={styles.hero} style={{ minHeight: "30vh", padding: "2rem 5%" }}>
        <motion.div 
          className={styles.heroContent}
          variants={itemVariants}
        >
          <h1 className={styles.title}>Discover People</h1>
          <p className={styles.subtitle}>
            Explore our cuurent User base and make connections!
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search people by username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.features} style={{ padding: "2rem 5%" }}>
        {loading ? (
          <motion.div 
            className={styles.loadingContainer}
            variants={itemVariants}
          >
            <FaSpinner className={styles.spinner} />
            <p>Loading events...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            className={styles.errorContainer}
            variants={itemVariants}
          >
            <p>{error}</p>
            <button 
              className={styles.primaryButton}
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </motion.div>
        ) : filteredUsers.length === 0 ? (
          <motion.div 
            className={styles.noEventsContainer}
            variants={itemVariants}
          >
            <h2>No events found</h2>
            <p>Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <motion.div 
            className={styles.eventGrid}
            variants={containerVariants}
            style={{ 
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 2fr))',
              gap: '2rem',
              width: '100%'
            }}
          >
            {filteredUsers.map((user) => (
              <motion.div
                key={user._id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ width: '100%' }}
              >
                <UserCard user={user} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Users;
