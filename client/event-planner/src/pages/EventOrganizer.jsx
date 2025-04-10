import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaSpinner } from "react-icons/fa";
import EventCard from "../components/EventCard";
import styles from "./LandingPage.module.css";

const EventOrganizer = () => {
  const [organizerEvents, setOrganizerEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchOrganizerEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/manage/organizerEvents", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setOrganizerEvents(response.data.Events || []);
      } catch (error) {
        console.error("Error fetching organizer events:", error);
      }
    };

    fetchOrganizerEvents();
  }, []);

  const filteredEvents = organizerEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? event.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

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
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      className={styles.landingContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ paddingTop: '80px' }}
    >
      <div className={styles.hero} style={{ minHeight: "30vh", padding: "2rem 5%" }}>
        <motion.div className={styles.heroContent} variants={itemVariants}>
          <h1 className={styles.title}>My Organized Events</h1>
          <p className={styles.subtitle}>
            Manage and oversee all the events you're organizing
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search your events..."
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
        <motion.div 
          className={styles.eventGrid}
          variants={containerVariants}
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event._id}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <EventCard 
                event={event}
                isOrganizer={true}
                link={`/organizer/events/${event._id}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventOrganizer;
