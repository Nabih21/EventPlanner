import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { eventService, venueService, authService } from '../services/api';
import { motion } from 'framer-motion';
import { 
  FiCalendar, FiMapPin, FiUsers, FiPlus, FiEdit2, 
  FiTrash2, FiArrowRight, FiGrid, FiList, FiAlertCircle, FiX 
} from 'react-icons/fi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalVenues: 0,
    upcomingEvents: 0,
    completedEvents: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth?type=login');
          return;
        }

        // Fetch user data
        const userData = await authService.getCurrentUser();
        setUser(userData);

        // Fetch events and venues in parallel
        const [eventsData, venuesData] = await Promise.all([
          eventService.getMyEvents(),
          venueService.getVenues()
        ]);

        setEvents(eventsData);

        // Calculate stats
        const now = new Date();
        const upcomingEventsCount = eventsData.filter(event => new Date(event.start_date) > now).length;
        const completedEventsCount = eventsData.filter(event => new Date(event.end_date) < now).length;

        setStats({
          totalEvents: eventsData.length,
          totalVenues: venuesData.length,
          upcomingEvents: upcomingEventsCount,
          completedEvents: completedEventsCount
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message || 'Failed to load dashboard data');
        if (error.response?.status === 401) {
          navigate('/auth?type=login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleCreateEvent = () => {
    navigate('/events/create');
  };

  const handleViewEventDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleEditEvent = (e, eventId) => {
    e.stopPropagation();
    navigate(`/events/edit/${eventId}`);
  };

  const handleDeleteEvent = (e, eventId) => {
    e.stopPropagation();
    setEventToDelete(eventId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await eventService.deleteEvent(eventToDelete);
      
      // Update events list and stats
      setEvents(events.filter(event => event._id !== eventToDelete));
      setStats(prev => ({
        ...prev,
        totalEvents: prev.totalEvents - 1
      }));
      
      setDeleteConfirmOpen(false);
      setEventToDelete(null);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event. Please try again.');
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setEventToDelete(null);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  const filteredEvents = events
    .filter(event => {
      // Filter by search query - safely check for name property and handle null/undefined
      if (searchQuery && event.name && !event.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by status - safely check date properties
      const eventStartDate = event.start_date ? new Date(event.start_date) : null;
      const eventEndDate = event.end_date ? new Date(event.end_date) : null;
      const now = new Date();
      
      if (filterStatus === 'upcoming' && eventStartDate && eventStartDate <= now) return false;
      if (filterStatus === 'past' && eventEndDate && eventEndDate > now) return false;
      
      return true;
    })
    // Sort by date if possible, otherwise just return as is
    .sort((a, b) => {
      try {
        return new Date(a.start_date) - new Date(b.start_date);
      } catch (error) {
        return 0;
      }
    });

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

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
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
            Loading your dashboard...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboardContainer}>
        <motion.div 
          className={styles.errorContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiAlertCircle size={50} color="#e53e3e" />
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button 
            className={styles.actionButton}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.dashboardContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.welcomeSection}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.welcomeContent}>
          <h1>Welcome back, {user?.username}!</h1>
          <p>Manage your events and explore new opportunities</p>
        </div>
        <motion.button 
          className={styles.createEventButton}
          onClick={handleCreateEvent}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus /> Create Event
        </motion.button>
      </motion.div>

      <motion.div 
        className={styles.statsGrid}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.statCard} variants={item}>
          <div className={styles.statIconWrapper}>
            <FiCalendar size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{stats.totalEvents}</h3>
            <p className={styles.statTitle}>Total Events</p>
          </div>
        </motion.div>
        
        <motion.div className={styles.statCard} variants={item}>
          <div className={styles.statIconWrapper}>
            <FiUsers size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{stats.upcomingEvents}</h3>
            <p className={styles.statTitle}>Upcoming Events</p>
          </div>
        </motion.div>
        
        <motion.div className={styles.statCard} variants={item}>
          <div className={styles.statIconWrapper}>
            <FiMapPin size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{stats.totalVenues}</h3>
            <p className={styles.statTitle}>Available Venues</p>
          </div>
        </motion.div>
        
        <motion.div className={styles.statCard} variants={item}>
          <div className={styles.statIconWrapper}>
            <FiCalendar size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{stats.completedEvents}</h3>
            <p className={styles.statTitle}>Completed Events</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.eventsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={styles.eventsSectionHeader}>
          <h2>My Events</h2>
          <div className={styles.eventControls}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterWrapper}>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            
            <div className={styles.viewToggle}>
              <button 
                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.activeView : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FiGrid />
              </button>
              <button 
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.activeView : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <motion.div 
            className={styles.noEvents}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>No events found</h3>
            <p>Create your first event or adjust your search filters</p>
            <motion.button 
              className={styles.createEventButton}
              onClick={handleCreateEvent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus /> Create New Event
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            className={viewMode === 'grid' ? styles.eventsGrid : styles.eventsList}
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredEvents.map(event => (
              <motion.div 
                key={event._id} 
                className={viewMode === 'grid' ? styles.eventGridCard : styles.eventListCard}
                onClick={() => handleViewEventDetails(event._id)}
                variants={item}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              >
                <div className={styles.eventHeader}>
                  <h3 className={styles.eventTitle}>{event.name}</h3>
                  <div className={styles.eventActions}>
                    <motion.button 
                      className={styles.iconButton}
                      onClick={(e) => handleEditEvent(e, event._id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiEdit2 />
                    </motion.button>
                    <motion.button 
                      className={styles.iconButton}
                      onClick={(e) => handleDeleteEvent(e, event._id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiTrash2 />
                    </motion.button>
                  </div>
                </div>
                
                <div className={styles.eventDetails}>
                  <div className={styles.eventDetail}>
                    <FiCalendar />
                    <span>{formatDate(event.start_date)}</span>
                  </div>
                  <div className={styles.eventDetail}>
                    <FiMapPin />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className={styles.eventStatus}>
                  <span className={new Date(event.start_date) > new Date() ? styles.upcomingBadge : styles.pastBadge}>
                    {new Date(event.start_date) > new Date() ? 'Upcoming' : 'Past'}
                  </span>
                </div>
                
                <div className={styles.viewDetails}>
                  <span>View Details</span>
                  <FiArrowRight />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        className={styles.quickActionsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2>Quick Actions</h2>
        <div className={styles.quickActionsGrid}>
          <motion.button 
            className={styles.quickActionCard}
            onClick={handleCreateEvent}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className={styles.quickActionIcon}>
              <FiPlus size={24} />
            </div>
            <h3>Create Event</h3>
            <p>Plan a new event</p>
          </motion.button>
          
          <motion.button 
            className={styles.quickActionCard}
            onClick={() => navigate('/venues')}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className={styles.quickActionIcon}>
              <FiMapPin size={24} />
            </div>
            <h3>Manage Venues</h3>
            <p>View and add venues</p>
          </motion.button>
          
          <motion.button 
            className={styles.quickActionCard}
            onClick={() => navigate('/profile')}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className={styles.quickActionIcon}>
              <FiUsers size={24} />
            </div>
            <h3>My Profile</h3>
            <p>View your profile</p>
          </motion.button>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.deleteModal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.deleteModalHeader}>
                <h3>Confirm Deletion</h3>
                <button 
                  onClick={cancelDelete}
                  className={styles.closeButton}
                >
                  <FiX />
                </button>
              </div>
              <p>Are you sure you want to delete this event? This action cannot be undone.</p>
              <div className={styles.deleteModalActions}>
                <motion.button 
                  className={styles.cancelButton}
                  onClick={cancelDelete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  className={styles.deleteButton}
                  onClick={confirmDelete}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? "Deleting..." : "Delete"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
    </motion.div>
  );
};

export default Dashboard;
