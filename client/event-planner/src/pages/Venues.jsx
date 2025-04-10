import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { venueService } from "../services/api";
import styles from "./Venues.module.css";
import { FiMapPin, FiUsers, FiCalendar, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
  const [currentVenue, setCurrentVenue] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    type: "",
    available_at: new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const response = await venueService.getVenues();
      setVenues(response);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch venues:", err);
      setError("Failed to load venues. Please try again.");
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, venue = null) => {
    setModalMode(mode);
    setCurrentVenue(venue);

    if (mode === "edit" && venue) {
      // Format date for datetime-local input
      const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
      };

      setFormData({
        name: venue.name || "",
        location: venue.location || "",
        capacity: venue.capacity || "",
        type: venue.type || "",
        available_at: formatDateForInput(venue.available_at)
      });
    } else {
      // Reset form for create mode
      setFormData({
        name: "",
        location: "",
        capacity: "",
        type: "",
        available_at: new Date().toISOString().slice(0, 16)
      });
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      setError(null); // Clear any previous errors
      
      console.log("Submitting venue data:", formData); // Debug log

      // Ensure capacity is a number
      const venueData = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        capacity: parseInt(formData.capacity, 10),
        type: formData.type.trim(),
        available_at: formData.available_at
      };
      
      // Validate data
      if (!venueData.name || !venueData.location || 
          isNaN(venueData.capacity) || venueData.capacity <= 0 || 
          !venueData.type || !venueData.available_at) {
        setError("Please fill all fields with valid data");
        setLoading(false);
        return;
      }
      
      if (modalMode === "create") {
        const response = await venueService.createVenue(venueData);
        console.log("Create venue response:", response);
      } else {
        const response = await venueService.updateVenue(currentVenue._id, venueData);
        console.log("Update venue response:", response);
      }
      
      // Refresh the venues list
      await fetchVenues();
      handleCloseModal();
      setLoading(false);
    } catch (error) {
      console.error(`Failed to ${modalMode} venue:`, error);
      if (error.response && error.response.data && error.response.data.Error) {
        // Display the specific error from the backend
        setError(error.response.data.Error);
      } else {
        setError(`Failed to ${modalMode} venue. Please try again.`);
      }
      setLoading(false);
    }
  };

  const handleDeleteVenue = async (venueId) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        setLoading(true);
        await venueService.deleteVenue(venueId);
        fetchVenues();
      } catch (error) {
        console.error("Failed to delete venue:", error);
        setError("Failed to delete venue. Please try again.");
        setLoading(false);
      }
    }
  };

  // Get venue type display name
  const getVenueTypeDisplay = (type) => {
    const typeMap = {
      "stadium": "Stadium",
      "school lounge": "School Lounge",
      "theater": "Theater",
      "park": "Park",
      "office building": "Office Building"
    };
    return typeMap[type] || type;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading && venues.length === 0) {
    return (
      <div className={styles.venuesContainer}>
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
            Loading venues...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.venuesContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Venue Management
        </motion.h1>
        <motion.button 
          className={styles.addButton}
          onClick={() => handleOpenModal("create")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus /> Add New Venue
        </motion.button>
      </div>

      {error && (
        <motion.div 
          className={styles.errorMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {venues.length === 0 && !loading ? (
        <motion.div 
          className={styles.noVenues}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>No venues found</h3>
          <p>Add your first venue to get started</p>
          <motion.button 
            className={styles.addButton}
            onClick={() => handleOpenModal("create")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus /> Add New Venue
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          className={styles.venuesGrid}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {venues.map((venue) => (
            <motion.div 
              key={venue._id} 
              className={styles.venueCard}
              variants={item}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            >
              <div className={styles.venueHeader}>
                <h3 className={styles.venueName}>{venue.name}</h3>
                <div className={styles.venueActions}>
                  <motion.button 
                    className={styles.iconButton}
                    onClick={() => handleOpenModal("edit", venue)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiEdit2 />
                  </motion.button>
                  <motion.button 
                    className={styles.iconButton}
                    onClick={() => handleDeleteVenue(venue._id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiTrash2 />
                  </motion.button>
                </div>
              </div>
              
              <div className={styles.venueDetails}>
                <div className={styles.venueDetail}>
                  <FiMapPin />
                  <span>{venue.location}</span>
                </div>
                <div className={styles.venueDetail}>
                  <FiUsers />
                  <span>Capacity: {venue.capacity}</span>
                </div>
                <div className={styles.venueDetail}>
                  <FiCalendar />
                  <span>Available: {new Date(venue.available_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className={styles.venueType}>
                <span className={styles.venueTypeBadge}>
                  {getVenueTypeDisplay(venue.type)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Venue Form Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <motion.div 
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2>{modalMode === "create" ? "Add New Venue" : "Edit Venue"}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Venue Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter venue name"
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
                  placeholder="Enter venue location"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="capacity">Capacity</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  placeholder="Enter venue capacity"
                  min="1"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="type">Venue Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select venue type</option>
                  <option value="stadium">Stadium</option>
                  <option value="school lounge">School Lounge</option>
                  <option value="theater">Theater</option>
                  <option value="park">Park</option>
                  <option value="office building">Office Building</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="available_at">Available From</label>
                <input
                  type="datetime-local"
                  id="available_at"
                  name="available_at"
                  value={formData.available_at}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formActions}>
                <motion.button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={handleCloseModal}
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
                  {loading ? 'Processing...' : modalMode === "create" ? 'Add Venue' : 'Update Venue'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Venues;