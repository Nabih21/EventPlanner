import { useEffect, useState } from "react";
// Import Link if you intend to use it, otherwise remove it.
// import { Link } from "react-router-dom"; 
import { venueService } from "../services/api";
// Import api if you intend to use it, otherwise remove it.
// import api from "../services/api"; 
import styles from "./Venues.module.css"; // Correct import
import { 
  FaMapMarkerAlt, 
  FaUsers, 
  FaCalendarAlt, 
  FaSearch,
  FaBuilding,
  // FaSpinner is not used directly, the loader uses CSS animation
  FaExclamationCircle,
  FaFilter
} from "react-icons/fa";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const response = await venueService.getVenues();
        // Ensure response.Venues is an array before setting state
        if (response && Array.isArray(response.Venues)) {
          setVenues(response.Venues);
        } else {
          // Handle case where response.Venues is not as expected
          console.warn("Received unexpected data format for venues:", response);
          setVenues([]); // Set to empty array to avoid errors
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch venues:", err);
        setError("Failed to load venues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchVenues();
  }, []);

  // Filter venues based on search term and type filter
  const filteredVenues = venues.filter((venue) => {
    // Add more robust checks for venue properties
    if (!venue || typeof venue.name !== 'string' || typeof venue.location !== 'string' || typeof venue.type !== 'string') {
      console.warn("Skipping invalid venue data:", venue);
      return false;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const lowerVenueType = venue.type.toLowerCase();
    const lowerFilter = filter.toLowerCase();

    const matchesSearch = 
      venue.name.toLowerCase().includes(lowerSearchTerm) ||
      venue.location.toLowerCase().includes(lowerSearchTerm) ||
      lowerVenueType.includes(lowerSearchTerm);
    
    const matchesFilter = filter === 'all' || lowerVenueType.includes(lowerFilter);
    
    return matchesSearch && matchesFilter;
  });

  // Get unique venue types for filters, ensuring types are valid strings
  const venueTypes = [...new Set(
    venues
      .filter(venue => venue && typeof venue.type === 'string' && venue.type.trim() !== '')
      .map(venue => venue.type)
  )];

  if (loading) {
    return (
      // Use styles object for class names
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>Loading venues...</p>
      </div>
    );
  }

  if (error) {
    return (
      // Use styles object for class names
      <div className={styles.venuesContainer}> {/* Added outer container */}
        <div className={styles.errorContainer}>
          <FaExclamationCircle size={40} />
          <h2>Unable to load venues</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryButton} // Use styles object
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    // Use styles object for class names
    <div className={styles.venuesContainer}> 
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Venues</h1>
          <p className={styles.subtitle}>Find the perfect location for your next event</p>
        </div>
      </div>
      
      <div className={styles.searchBar}>
        <FaSearch style={{ color: 'var(--text-tertiary)', fontSize: '1.25rem' }} />
        <input 
          type="text"
          placeholder="Search for venues by name, location or type..."
          className={styles.searchInput} // Use styles object
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className={styles.filterContainer}>
        <div 
          // Use template literal for conditional classes with styles object
          className={`${styles.filterItem} ${filter === 'all' ? styles.active : ''}`} 
          onClick={() => setFilter('all')}
        >
          <FaFilter /> All Types
        </div>
        {venueTypes.map((type, index) => (
          <div 
            key={index}
             // Use template literal for conditional classes with styles object
            className={`${styles.filterItem} ${filter === type ? styles.active : ''}`}
            onClick={() => setFilter(type)}
          >
            {type}
          </div>
        ))}
      </div>

      {filteredVenues.length > 0 ? (
        // Use styles object for class names
        <div className={styles.venuesGrid}> 
          {filteredVenues.map((venue) => (
            // Use styles object for class names
            <div key={venue._id} className={styles.venueCard}> 
              <div className={styles.venueImageContainer}>
                {/* venueIcon class was defined but not used, kept FaBuilding with inline style */}
                <FaBuilding style={{ fontSize: '3rem', color: 'var(--primary-color)' }} /> 
              </div>
              
              <div className={styles.venueContent}>
                <div className={styles.venueHeader}>
                  <h3 className={styles.venueName}>{venue.name}</h3>
                  <span className={styles.venueType}>{venue.type}</span>
                </div>
                
                <div className={styles.venueDetails}>
                  <div className={styles.venueDetail}>
                    <FaMapMarkerAlt className={styles.detailIcon} />
                    <span>{venue.location}</span>
                  </div>
                  
                  <div className={styles.venueDetail}>
                    <FaUsers className={styles.detailIcon} />
                    {/* Added check for capacity existence */}
                    <span>Capacity: {venue.capacity ?? 'N/A'}</span> 
                  </div>
                  
                  <div className={styles.venueDetail}>
                    <FaCalendarAlt className={styles.detailIcon} />
                    {/* Added check for available_at existence and validity */}
                    <span>
                      Available from: {venue.available_at ? new Date(venue.available_at).toLocaleDateString() : 'N/A'}
                    </span> 
                  </div>
                </div>
                
                <div className={styles.venueFooter}>
                  {/* 
                    If you want this button to link somewhere, wrap it in <Link> 
                    Example:
                    <Link to={`/venues/${venue._id}`} className={styles.viewButton}> 
                      View Venue Details
                    </Link>
                    Otherwise, add an onClick handler if it should perform an action.
                  */}
                  <button className={styles.viewButton}> 
                    View Venue Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
         // Use styles object for class names
        <div className={styles.emptyState}>
          <FaBuilding className={styles.emptyStateIcon} />
          <p className={styles.emptyStateText}>
            No venues found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Venues;