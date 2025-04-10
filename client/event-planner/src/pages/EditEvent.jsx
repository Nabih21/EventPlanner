import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventService, venueService } from '../services/api';
import styles from './CreateEvent.module.css'; // Reuse the same styles

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    start_date: '',
    end_date: '',
    venue: '',
    status: 'planned'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch the event and venues in parallel
        const [eventData, venuesData] = await Promise.all([
          eventService.getEventById(id),
          venueService.getVenues()
        ]);
        
        setVenues(venuesData);
        
        console.log("Event data:", eventData);
        
        // Format dates for datetime-local input
        const formatDateForInput = (dateString) => {
          try {
            const date = new Date(dateString);
            return date.toISOString().slice(0, 16);
          } catch (error) {
            console.error("Date formatting error:", error);
            return new Date().toISOString().slice(0, 16);
          }
        };
        
        // Set form data from the fetched event
        setFormData({
          name: eventData.name || '',
          location: eventData.location || '',
          description: eventData.description || '',
          start_date: formatDateForInput(eventData.start_date),
          end_date: formatDateForInput(eventData.end_date),
          venue: eventData.venues && eventData.venues.length > 0 ? eventData.venues[0] : '',
          status: eventData.status || 'planned'
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load event data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      
      // Format the data as needed by the API
      const eventData = {
        name: formData.name,
        location: formData.location,
        description: formData.description,
        start_date: new Date(formData.start_date),
        end_date: new Date(formData.end_date),
        venues: [formData.venue],
        status: formData.status
      };
      
      await eventService.updateEvent(id, eventData);
      setLoading(false);
      
      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Failed to update event. Please try again.');
      setLoading(false);
    }
  };

  if (loading && !error) {
    return (
      <div className={styles.createEventContainer}>
        <div className={styles.loadingContainer}>
          <motion.div 
            className={styles.loadingSpinner}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <p>Loading event data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.createEventContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.formContainer}>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Edit Event
        </motion.h1>
        
        {error && (
          <motion.div 
            className={styles.errorMessage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
        
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter event name"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter event location"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your event"
              rows="4"
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="start_date">Start Date & Time</label>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="end_date">End Date & Time</label>
              <input
                type="datetime-local"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="venue">Venue</label>
            <select
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            >
              <option value="">Select a venue</option>
              {venues.map((venue) => (
                <option key={venue._id} value={venue._id}>
                  {venue.name} - {venue.location} (Capacity: {venue.capacity})
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="planned">Planned</option>
              <option value="in progress">In Progress</option>
              <option value="finished">Finished</option>
              <option value="past">Past</option>
            </select>
          </div>
          
          <div className={styles.formActions}>
            <motion.button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? 'Updating...' : 'Update Event'}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default EditEvent; 