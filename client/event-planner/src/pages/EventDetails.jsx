import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { eventService } from "../services/api";
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
  FaInfoCircle,
  FaCreditCard,
  FaLock,
  FaUser,
  FaTimes
} from "react-icons/fa";
import styles from "./LandingPage.module.css";
import api from "../services/api"; // Import your API service

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await eventService.getEvent(id);
        setEvent(response.Event);
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

  // Check if user is already registered
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        // Only make the API call if we have a token (user is logged in)
        const token = localStorage.getItem('token');
        if (!token) return;
        
        // Use the API service instead of direct axios call for consistency
        const response = await api.get("/auth/viewTickets");
        
        if (response.data?.Tickets && response.data.Tickets.length > 0) {
          // Compare using string equality since IDs might be in different formats
          const userTicket = response.data.Tickets.find(
            ticket => String(ticket.EventID) === String(id)
          );
          
          if (userTicket) {
            setIsRegistered(true);
            setRegistrationDetails(userTicket);
          } else {
            setIsRegistered(false);
            setRegistrationDetails(null);
          }
        } else {
          setIsRegistered(false);
          setRegistrationDetails(null);
        }
      } catch (error) {
        console.error('Error checking registration:', error);
      }
    };

    if (id) {
      checkRegistration();
    }
  }, [id]);

  // State for registration process
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Payment form states
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const sliderRef = useRef(null);
  const maxSlideWidth = 240; // Maximum slider width in pixels

  // Handle registration
  const handleRegister = () => {
    setShowPaymentForm(true);
  };

  // Handle payment form submission
  const handlePaymentSubmit = async () => {
    try {
      setIsPaying(true);
      setPaymentError(null);
      setRegistrationError(null);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate payment form
      if (!cardNumber || cardNumber.length < 16) {
        setPaymentError("Please enter a valid card number");
        setIsPaying(false);
        return;
      }
      
      if (!cardName) {
        setPaymentError("Please enter the cardholder name");
        setIsPaying(false);
        return;
      }
      
      if (!cardPin || cardPin.length < 3) {
        setPaymentError("Please enter a valid PIN");
        setIsPaying(false);
        return;
      }
      
      // If validation passes, register the user for the event
      setRegistrationLoading(true);
      
      const response = await eventService.getTicket(id);
      
      if (response?.Ticket) {
        setIsRegistered(true);
        setRegistrationDetails(response.Ticket);
        setRegistrationSuccess(true);
        setShowPaymentForm(false);
        
        // Reset payment form
        setCardNumber("");
        setCardName("");
        setCardPin("");
        setSliderPosition(0);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setRegistrationSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      setRegistrationError(error.response?.data?.message || 'Failed to register for the event. Please try again.');
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        setRegistrationError(null);
      }, 5000);
    } finally {
      setRegistrationLoading(false);
      setIsPaying(false);
    }
  };
  
  // Handle slider drag
  const handleSliderDrag = (e) => {
    if (isPaying) return;
    
    const slider = sliderRef.current;
    const sliderRect = slider.getBoundingClientRect();
    const containerRect = slider.parentElement.getBoundingClientRect();
    
    // Calculate horizontal position relative to slider container
    const newPosition = Math.max(0, Math.min(e.clientX - containerRect.left, maxSlideWidth - sliderRect.width));
    setSliderPosition(newPosition);
    
    // Check if slider has reached the end (payment confirmation)
    if (newPosition >= maxSlideWidth - sliderRect.width - 10) {
      setSliderPosition(maxSlideWidth - sliderRect.width);
      handlePaymentSubmit();
    }
  };
  
  // Handle mouse down on slider
  const handleSliderMouseDown = () => {
    if (isPaying) return;
    
    document.addEventListener('mousemove', handleSliderDrag);
    document.addEventListener('mouseup', handleSliderMouseUp);
  };
  
  // Handle mouse up (stop dragging)
  const handleSliderMouseUp = () => {
    document.removeEventListener('mousemove', handleSliderDrag);
    document.removeEventListener('mouseup', handleSliderMouseUp);
    
    // Reset slider position if not completed
    if (sliderPosition < maxSlideWidth - sliderRef.current.getBoundingClientRect().width - 10) {
      setSliderPosition(0);
    }
  };
  
  // Handle touch events for mobile
  const handleSliderTouchStart = () => {
    if (isPaying) return;
    
    document.addEventListener('touchmove', handleSliderTouchMove);
    document.addEventListener('touchend', handleSliderTouchEnd);
  };
  
  const handleSliderTouchMove = (e) => {
    if (isPaying) return;
    
    const slider = sliderRef.current;
    const sliderRect = slider.getBoundingClientRect();
    const containerRect = slider.parentElement.getBoundingClientRect();
    
    // Get touch position
    const touch = e.touches[0];
    
    // Calculate horizontal position relative to slider container
    const newPosition = Math.max(0, Math.min(touch.clientX - containerRect.left, maxSlideWidth - sliderRect.width));
    setSliderPosition(newPosition);
    
    // Check if slider has reached the end (payment confirmation)
    if (newPosition >= maxSlideWidth - sliderRect.width - 10) {
      setSliderPosition(maxSlideWidth - sliderRect.width);
      handlePaymentSubmit();
    }
  };
  
  const handleSliderTouchEnd = () => {
    document.removeEventListener('touchmove', handleSliderTouchMove);
    document.removeEventListener('touchend', handleSliderTouchEnd);
    
    // Reset slider position if not completed
    if (sliderPosition < maxSlideWidth - sliderRef.current.getBoundingClientRect().width - 10) {
      setSliderPosition(0);
    }
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
          
          {/* Registration Status UI */}
          {!isRegistered ? (
            <div style={{ alignSelf: 'flex-start', position: 'relative' }}>
              <button 
                className={styles.primaryButton}
                onClick={handleRegister}
                disabled={registrationLoading || showPaymentForm}
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: (registrationLoading || showPaymentForm) ? 0.7 : 1,
                  cursor: (registrationLoading || showPaymentForm) ? 'not-allowed' : 'pointer'
                }}
              >
                {registrationLoading ? (
                  <>
                    <FaSpinner className={styles.spinner} /> Registering...
                  </>
                ) : (
                  'Register for Event'
                )}
              </button>
              
              {/* Payment Form Overlay */}
              {showPaymentForm && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(8px)",
                    zIndex: 1000,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      padding: "2rem",
                      width: "90%",
                      maxWidth: "500px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }}
                  >
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      marginBottom: "1.5rem"
                    }}>
                      <h2 style={{ 
                        margin: 0, 
                        color: "#2b5876", 
                        fontSize: "1.5rem", 
                        fontWeight: "600" 
                      }}>
                        Complete Registration
                      </h2>
                      <button
                        onClick={() => setShowPaymentForm(false)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#718096",
                          fontSize: "1.25rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.5rem"
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    
                    <div style={{ marginBottom: "2rem" }}>
                      <p style={{ color: "#4a5568", marginBottom: "1.5rem" }}>
                        Please enter your payment details to complete your registration for <strong>{event.name}</strong>.
                      </p>
                      
                      {/* Form Inputs */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "80%" }}>
                        <div style={{ position: "relative" }}>
                          <label
                            htmlFor="cardNumber"
                            style={{
                              display: "block",
                              marginBottom: "0.5rem",
                              color: "#4a5568",
                              fontSize: "0.875rem",
                              fontWeight: "500",
                              
                            }}
                          >
                            Card Number
                          </label>
                          <div style={{ position: "relative" }}>
                            <FaCreditCard
                              style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#718096"
                              }}
                            />
                            <input
                              type="text"
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => {
                                // Only allow digits, limit to 16 characters
                                const value = e.target.value.replace(/[^\d]/g, '').substring(0, 16);
                                setCardNumber(value);
                              }}
                              style={{
                                width: "100%",
                                padding: "0.75rem 1rem 0.75rem 2.75rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "10px",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "all 0.3s ease",
                                backgroundColor: "#f8fafc"
                              }}
                            />
                          </div>
                        </div>
                        
                        <div style={{ position: "relative" }}>
                          <label
                            htmlFor="cardName"
                            style={{
                              display: "block",
                              marginBottom: "0.5rem",
                              color: "#4a5568",
                              fontSize: "0.875rem",
                              fontWeight: "500"
                            }}
                          >
                            Cardholder Name
                          </label>
                          <div style={{ position: "relative" }}>
                            <FaUser
                              style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#718096"
                              }}
                            />
                            <input
                              type="text"
                              id="cardName"
                              placeholder="John Doe"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "0.75rem 1rem 0.75rem 2.75rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "10px",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "all 0.3s ease",
                                backgroundColor: "#f8fafc"
                              }}
                            />
                          </div>
                        </div>
                        
                        <div style={{ position: "relative" }}>
                          <label
                            htmlFor="cardPin"
                            style={{
                              display: "block",
                              marginBottom: "0.5rem",
                              color: "#4a5568",
                              fontSize: "0.875rem",
                              fontWeight: "500"
                            }}
                          >
                            Security Code (CVV)
                          </label>
                          <div style={{ position: "relative" }}>
                            <FaLock
                              style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#718096"
                              }}
                            />
                            <input
                              type="password"
                              id="cardPin"
                              placeholder="•••"
                              value={cardPin}
                              onChange={(e) => {
                                // Only allow digits, limit to 4 characters
                                const value = e.target.value.replace(/[^\d]/g, '').substring(0, 4);
                                setCardPin(value);
                              }}
                              style={{
                                width: "100%",
                                padding: "0.75rem 1rem 0.75rem 2.75rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "10px",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "all 0.3s ease",
                                backgroundColor: "#f8fafc"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Slide to Pay */}
                    <div style={{ marginTop: "1.5rem" }}>
                      <p
                        style={{
                          color: "#4a5568",
                          marginBottom: "0.75rem",
                          fontSize: "0.875rem",
                          fontWeight: "500"
                        }}
                      >
                        Slide to complete payment
                      </p>
                      <div
                        style={{
                          position: "relative",
                          height: "50px",
                          backgroundColor: "#f8fafc",
                          borderRadius: "25px",
                          border: "1px solid #e2e8f0",
                          width: "100%",
                          maxWidth: "300px"
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#718096",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            pointerEvents: "none"
                          }}
                        >
                          {isPaying ? "Processing..." : "Slide to Pay"}
                        </div>
                        <div
                          ref={sliderRef}
                          style={{
                            position: "absolute",
                            top: "5px",
                            left: "5px",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#2b5876",
                            borderRadius: "50%",
                            cursor: isPaying ? "not-allowed" : "grab",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            transform: `translateX(${sliderPosition}px)`,
                            transition: isPaying ? "none" : "transform 0.1s ease"
                          }}
                          onMouseDown={!isPaying ? handleSliderMouseDown : undefined}
                          onTouchStart={!isPaying ? handleSliderTouchStart : undefined}
                        >
                          {isPaying ? (
                            <FaSpinner className={styles.spinner} style={{ fontSize: "1rem" }} />
                          ) : (
                            <FaArrowLeft style={{ transform: "rotate(180deg)" }} />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Error Message */}
                    {paymentError && (
                      <div
                        style={{
                          backgroundColor: "rgba(244, 67, 54, 0.1)",
                          border: "1px solid rgba(244, 67, 54, 0.3)",
                          borderRadius: "8px",
                          padding: "0.75rem 1rem",
                          marginTop: "1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "#F44336"
                        }}
                      >
                        <FaExclamationTriangle /> {paymentError}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
              
              {/* Error Message */}
              {registrationError && (
                <div style={{ 
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  borderRadius: '4px',
                  padding: '0.75rem 1rem',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#F44336'
                }}>
                  <FaExclamationTriangle /> {registrationError}
                </div>
              )}
              
              {/* Success Message */}
              {registrationSuccess && (
                <div style={{ 
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  borderRadius: '4px',
                  padding: '0.75rem 1rem',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#4CAF50'
                }}>
                  <FaCheckCircle /> Successfully registered for the event!
                </div>
              )}
            </div>
          ) : (
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#4CAF50',
                marginBottom: '0.5rem'
              }}>
                <FaCheckCircle /> 
                <span style={{ fontWeight: 'bold' }}>You're Registered!</span>
              </div>
              
              {registrationDetails && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Ticket ID:</span>
                    <span style={{ color: 'white' }}>{registrationDetails._id}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Role:</span>
                    <span style={{ 
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.9em'
                    }}>
                      {registrationDetails.role}
                    </span>
                  </div>
                </div>
              )}
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
