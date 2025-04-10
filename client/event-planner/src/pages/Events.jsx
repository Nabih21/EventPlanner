// src/pages/Events.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaCalendarAlt, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import EventCard from "../components/EventCard";
import styles from "./LandingPage.module.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all events from your backend
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/manage/viewEvents");
        setEvents(response.data.Events || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter the events by search term and status
  const filteredEvents = events.filter((event) => {
    // Match name or location or description with searchTerm
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));

    // If statusFilter is empty, it means "show all"
    const matchesStatus = statusFilter ? event.status === statusFilter : true;

    return matchesSearch && matchesStatus;
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
          <h1 className={styles.title}>Discover Events</h1>
          <p className={styles.subtitle}>
            Explore our curated collection of upcoming events and find your next adventure.
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search events by name, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterContainer}>
              <FaFilter className={styles.filterIcon} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Statuses</option>
                <option value="planned">Planned</option>
                <option value="in progress">In Progress</option>
                <option value="finished">Finished</option>
                <option value="past">Past</option>
              </select>
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
        ) : filteredEvents.length === 0 ? (
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
            {filteredEvents.map((event) => (
              <motion.div
                key={event._id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ width: '100%' }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Events;
