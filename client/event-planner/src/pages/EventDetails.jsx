import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaArrowLeft, 
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserFriends,
  FaInfoCircle
} from "react-icons/fa";
import styles from "./LandingPage.module.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/manage/viewEvent/${id}`);
        console.log("Single event response:", response.data); 
        setEvent(response.data.Event);
        setError(null);
      } catch (error) {
        console.error("Error fetching single event:", error);
        setError("Failed to load event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time to a more readable format
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'planned':
        return '#4CAF50'; // Green
      case 'in progress':
        return '#2196F3'; // Blue
      case 'finished':
        return '#9E9E9E'; // Gray
      case 'past':
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Default gray
    }
  };

  // Handle registration
  const handleRegister = () => {
    // In a real app, this would make an API call to register the user
    setIsRegistered(true);
    // Show a success message or redirect
  };

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

  if (loading) {
    return (
      <motion.div 
        className={styles.landingContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '80vh',
          paddingTop: '80px' // Add padding to account for fixed navbar
        }}
      >
        <motion.div 
          className={styles.loadingContainer}
          variants={itemVariants}
          style={{ textAlign: 'center' }}
        >
          <FaSpinner className={styles.spinner} style={{ fontSize: '3rem', marginBottom: '1rem' }} />
          <h2>Loading event details...</h2>
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className={styles.landingContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '80vh',
          paddingTop: '80px' // Add padding to account for fixed navbar
        }}
      >
        <motion.div 
          className={styles.errorContainer}
          variants={itemVariants}
          style={{ textAlign: 'center' }}
        >
          <FaExclamationTriangle style={{ fontSize: '3rem', color: '#F44336', marginBottom: '1rem' }} />
          <h2>Error</h2>
          <p>{error}</p>
          <button 
            className={styles.primaryButton}
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem' }}
          >
            Try Again
          </button>
        </motion.div>
      </motion.div>
    );
  }

  if (!event) {
    return (
      <motion.div 
        className={styles.landingContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '80vh',
          paddingTop: '80px' // Add padding to account for fixed navbar
        }}
      >
        <motion.div 
          className={styles.errorContainer}
          variants={itemVariants}
          style={{ textAlign: 'center' }}
        >
          <FaInfoCircle style={{ fontSize: '3rem', color: '#2196F3', marginBottom: '1rem' }} />
          <h2>Event Not Found</h2>
          <p>The event you're looking for doesn't exist or has been removed.</p>
          <button 
            className={styles.primaryButton}
            onClick={() => navigate('/events')}
            style={{ marginTop: '1rem' }}
          >
            Back to Events
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.landingContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ paddingTop: '80px' }} // Add padding to account for fixed navbar
    >
      <div className={styles.hero} style={{ 
        minHeight: "50vh", 
        padding: "2rem 5%",
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${event.picture}${event.name.replace(/\s+/g, ',')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <motion.div 
          className={styles.heroContent}
          variants={itemVariants}
          style={{ maxWidth: '800px', width: '100%' }}
        >
          <div style={{ width: '100%', marginBottom: '2rem' }}>
            <button 
              onClick={() => navigate('/events')}
              className={styles.secondaryButton}
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: 'white',
                marginLeft: '0' // Ensure it's aligned to the left
              }}
            >
              <FaArrowLeft /> Back to Events
            </button>
          </div>
          
          <div style={{
            backgroundColor: getStatusColor(event.status),
            color: 'white',
            padding: '5px 15px',
            borderRadius: '20px',
            display: 'inline-block',
            marginBottom: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            {event.status || 'Unknown'}
          </div>
          
          <h1 className={styles.title} style={{ color: 'white', marginBottom: '1rem' }}>
            {event.name}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
              <span>{event.location}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
              <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaClock style={{ marginRight: '0.5rem' }} />
              <span>{formatTime(event.start_date)} - {formatTime(event.end_date)}</span>
            </div>
          </div>
          
          {!isRegistered ? (
            <button 
              className={styles.primaryButton}
              onClick={handleRegister}
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                alignSelf: 'flex-start' // Align to the left
              }}
            >
              Register for Event
            </button>
          ) : (
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              color: '#4CAF50',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              fontWeight: 'bold',
              alignSelf: 'flex-start' // Align to the left
            }}>
              <FaCheckCircle /> Registered
            </div>
          )}
        </motion.div>
      </div>

      <div className={styles.features} style={{ padding: "4rem 5%", backgroundColor: '#f8f9fa' }}>
        <motion.div 
          className={styles.featureGrid}
          variants={containerVariants}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <motion.div 
            className={styles.featureCard}
            variants={itemVariants}
            style={{ 
              gridColumn: '1 / -1',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <h2 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>About This Event</h2>
            <p style={{ color: '#718096', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {event.description || 'No description available for this event.'}
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.featureCard}
            variants={itemVariants}
          >
            <div className={styles.featureIcon} style={{ backgroundColor: 'rgba(33, 150, 243, 0.1)' }}>
              <FaUserFriends style={{ color: '#2196F3', fontSize: '2rem' }} />
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Attendees</h3>
            <p style={{ color: '#718096' }}>
              Join other attendees at this exciting event. Connect with like-minded individuals and expand your network.
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.featureCard}
            variants={itemVariants}
          >
            <div className={styles.featureIcon} style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
              <FaCalendarAlt style={{ color: '#4CAF50', fontSize: '2rem' }} />
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Schedule</h3>
            <p style={{ color: '#718096' }}>
              The event will take place from {formatDate(event.start_date)} to {formatDate(event.end_date)}.
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.featureCard}
            variants={itemVariants}
          >
            <div className={styles.featureIcon} style={{ backgroundColor: 'rgba(156, 39, 176, 0.1)' }}>
              <FaMapMarkerAlt style={{ color: '#9C27B0', fontSize: '2rem' }} />
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Location</h3>
            <p style={{ color: '#718096' }}>
              The event will be held at {event.location}. Please arrive 15 minutes before the start time.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventDetails;
