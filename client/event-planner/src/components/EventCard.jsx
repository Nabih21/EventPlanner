// src/components/EventCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import styles from "../pages/LandingPage.module.css";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to /event/:id
    navigate(`/event/${event._id}`);
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  // Get status color
  const getPromotionColor = (promoted) => {
    if(promoted) {
      return 'gold'; // Gold for promoted events
    }
  };

  // Define the card style with an optional gold border if event.promotion is true
  const cardStyle = {
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    marginBottom: '0',
    borderRadius: '10px',
    border: '4px solid #2b5876' 
  };

  return (
    <div 
      onClick={handleCardClick}
      className={styles.eventCard}
      style={cardStyle}
    >
      <div style={{ 
        position: 'relative',
        width: '250px',
        minWidth: '250px',
        height: 'auto',
        overflow: 'hidden',
        borderRadius: '10px 0 0 10px'
      }}>
        {/* You can replace this placeholder with a real image URL if your event has one */}
        <img
          src= {event.picture}
          alt={event.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: getStatusColor(event.status),
          color: 'white',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          {event.status || 'Unknown'}
        </div>

        {event.promoted &&
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: '#D4AF37',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          Sponsored
        </div>}
      </div>
      
      <div style={{ 
        padding: '1.5rem', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'white',
        borderRadius: '0 10px 10px 0'
      }}>
        <div>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#2d3748'
          }}>
            {event.name}
          </h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <FaMapMarkerAlt style={{ color: '#2b5876', marginRight: '0.5rem' }} />
              <span style={{ color: '#718096' }}>{event.location}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaCalendarAlt style={{ color: '#2b5876', marginRight: '0.5rem' }} />
              <span style={{ color: '#718096' }}>
                {formatDate(event.start_date)} - {formatDate(event.end_date)}
              </span>
            </div>
          </div>
          
          {event.description && (
            <p style={{ 
              color: '#718096', 
              marginBottom: '1.5rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.6'
            }}>
              {event.description}
            </p>
          )}
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-start',
          marginTop: '1rem'
        }}>
          <button 
            className={styles.primaryButton}
            style={{ 
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            View Details <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
