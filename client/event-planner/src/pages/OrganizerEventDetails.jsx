import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSpinner, FaUsers, FaUpload, FaEdit } from "react-icons/fa";
import axios from "axios";
import styles from "./LandingPage.module.css";

const OrganizerEventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/manage/events/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEvent(response.data.Event);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  if (loading) return (
    <div className={styles.loadingContainer}>
      <FaSpinner className={styles.spinner} />
      <p>Loading event details...</p>
    </div>
  );

  if (!event) return (
    <div className={styles.errorContainer}>
      <p>Event not found</p>
    </div>
  );

  return (
    <motion.div 
      className={styles.landingContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.eventDetailsHero}>
        <div className={styles.eventDetailsContent}>
          <motion.h1 variants={itemVariants} className={styles.title}>
            {event.name}
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.subtitle}>
            {event.description}
          </motion.p>
        </div>
      </div>

      <div className={styles.features}>
        <motion.div className={styles.eventDetailsInfo}>
          {/* Basic Info Card */}
          <motion.div 
            className={styles.eventDetailsCard}
            variants={itemVariants}
          >
            <h3>Event Information</h3>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {event.status}</p>
          </motion.div>

          {/* Role Management Card */}
          <motion.div 
            className={styles.eventDetailsCard}
            variants={itemVariants}
          >
            <h3>Manage Roles</h3>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>
                <FaUsers /> Add Speaker
              </button>
              <button className={styles.secondaryButton}>
                <FaUsers /> Add Organizer
              </button>
            </div>
          </motion.div>

          {/* Materials Management Card */}
          <motion.div 
            className={styles.eventDetailsCard}
            variants={itemVariants}
          >
            <h3>Materials</h3>
            <button className={styles.primaryButton}>
              <FaUpload /> Upload Material
            </button>
            {/* Material list will go here */}
          </motion.div>

          {/* Event Management Card */}
          <motion.div 
            className={styles.eventDetailsCard}
            variants={itemVariants}
          >
            <h3>Event Management</h3>
            <button className={styles.primaryButton}>
              <FaEdit /> Edit Event Details
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrganizerEventDetails;
