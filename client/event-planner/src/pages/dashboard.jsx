import { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import api from '../services/api';
import styles from './dashboard.module.css';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaTicketAlt, 
  FaMapMarkerAlt, 
  FaBell, 
  FaUserFriends, 
  FaSignOutAlt,
  FaPlus
} from 'react-icons/fa';

const Dashboard = () => {
  // State for user data
  const [userData, setUserData] = useState(null);
  const [userTickets, setUserTickets] = useState([]);
  const [events, setEvents] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState({
    user: true,
    tickets: true,
    events: true,
    friends: true,
    friendRequests: true
  });
  const [errors, setErrors] = useState({
    user: null,
    tickets: null,
    events: null,
    friends: null,
    friendRequests: null
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');
  
  useEffect(() => {
    if (!token || !userID) return;

    const fetchUserData = async () => {
      try {
        const userResponse = await api.get(`/auth/viewUser/${userID}`);
        if (userResponse.data && userResponse.data.User) {
          setUserData(userResponse.data.User[0]);
        }
      } catch (err) {
        setErrors(prev => ({ ...prev, user: 'Failed to load user data' }));
        console.error('User data fetch error:', err);
      } finally {
        setLoading(prev => ({ ...prev, user: false }));
      }
    };

    const fetchTicketsAndEvents = async () => {
      try {
        const ticketsResponse = await api.get('/auth/viewTickets');
        if (ticketsResponse.data && ticketsResponse.data.Tickets) {
          setUserTickets(ticketsResponse.data.Tickets);
          
          try {
            const eventPromises = ticketsResponse.data.Tickets.map(ticket => 
              api.get(`/manage/viewEvent/${ticket.EventID}`)
            );
            const eventResponses = await Promise.all(eventPromises);
            const eventData = eventResponses.map(response => response.data.Event);
            setEvents(eventData);
          } catch (err) {
            setErrors(prev => ({ ...prev, events: 'Failed to load event details' }));
            console.error('Events fetch error:', err);
          } finally {
            setLoading(prev => ({ ...prev, events: false }));
          }
        }
      } catch (err) {
        setErrors(prev => ({ ...prev, tickets: 'Failed to load tickets' }));
        console.error('Tickets fetch error:', err);
      } finally {
        setLoading(prev => ({ ...prev, tickets: false }));
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const incomingRequestsResponse = await api.get('/friends/viewIncoming');
        if (incomingRequestsResponse.data && incomingRequestsResponse.data.Incoming_Friend_Requests) {
          setFriendRequests(incomingRequestsResponse.data.Incoming_Friend_Requests);
        }
      } catch (err) {
        setErrors(prev => ({ ...prev, friendRequests: 'Failed to load friend requests' }));
        console.error('Friend requests fetch error:', err);
      } finally {
        setLoading(prev => ({ ...prev, friendRequests: false }));
      }
    };

    const fetchFriends = async () => {
      try {
        const friendsResponse = await api.get('/friends/viewFriends');
        if (friendsResponse.data && friendsResponse.data.Friends) {
          setFriends(friendsResponse.data.Friends);
        }
      } catch (err) {
        if (err.response?.status === 400 && err.response?.data?.Error?.includes('no friends')) {
          // This is an expected case when the user has no friends yet
          setFriends([]);
        } else {
          setErrors(prev => ({ ...prev, friends: 'Failed to load friends list' }));
          console.error('Friends fetch error:', err);
        }
      } finally {
        setLoading(prev => ({ ...prev, friends: false }));
      }
    };

    // Start all fetches in parallel
    fetchUserData();
    fetchTicketsAndEvents();
    fetchFriendRequests();
    fetchFriends();
  }, [token, userID]);

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  // If not logged in, redirect to auth page
  if (!token || !userID) {
    return <Navigate to="/auth" />;
  }

  // Show error message for user data failure since it's critical
  if (errors.user) {
    return (
      <div className={styles.errorContainer}>
        <h2>Unable to load your profile</h2>
        <p>{errors.user}</p>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Show loading state only when all critical data is loading
  if (loading.user || loading.tickets) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading your personalized dashboard...</p>
      </div>
    );
  }
  
  // Render dashboard content
  return (
    <div className={styles.dashboardContainer}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.profileSection}>
          <div className={styles.profileAvatar}>
            {userData?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className={styles.profileInfo}>
            <h3>{userData?.username || 'User'}</h3>
            <span className={styles.userStatus}>Online</span>
          </div>
        </div>
        
        <nav className={styles.sidebarNav}>
          <button 
            className={`${styles.navButton} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaCalendarAlt className={styles.navIcon} />
            Overview
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'events' ? styles.active : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <FaCalendarAlt className={styles.navIcon} />
            My Events
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'tickets' ? styles.active : ''}`}
            onClick={() => setActiveTab('tickets')}
          >
            <FaTicketAlt className={styles.navIcon} />
            Tickets
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'friends' ? styles.active : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            <FaUserFriends className={styles.navIcon} />
            Friends
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'venues' ? styles.active : ''}`}
            onClick={() => setActiveTab('venues')}
          >
            <FaMapMarkerAlt className={styles.navIcon} />
            Venues
          </button>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt className={styles.logoutIcon} />
            Log out
          </button>
        </div>
      </aside>
      
      <div className={styles.mobileMenuButton} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <span className={`${styles.hamburger} ${isSidebarOpen ? styles.open : ''}`} />
      </div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Notification Bar */}
        <div className={styles.notificationBar}>
          <div className={styles.pageTitle}>
            <h1>Dashboard</h1>
            <p>Welcome back, {userData?.username || 'User'}!</p>
          </div>
          
          <div className={styles.notificationContainer}>
            <button className={styles.notificationButton}>
              <FaBell />
              {friendRequests.length > 0 && (
                <span className={styles.notificationBadge}>{friendRequests.length}</span>
              )}
            </button>
          </div>
        </div>
        
        {/* Dashboard Content */}
        {activeTab === 'overview' && (
          <div className={styles.dashboardGrid}>
            <div className={styles.welcomeCard}>
              <h2>Hello, {userData?.username || 'User'}! 👋</h2>
              <p>Here's what's happening with your events today.</p>
              <div className={styles.statsContainer}>
                <div className={styles.statCard}>
                  <div className={styles.statIconContainer}>
                    <FaCalendarAlt className={styles.statIcon} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{events.length}</span>
                    <span className={styles.statLabel}>Events</span>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIconContainer}>
                    <FaTicketAlt className={styles.statIcon} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{userTickets.length}</span>
                    <span className={styles.statLabel}>Tickets</span>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIconContainer}>
                    <FaUserFriends className={styles.statIcon} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{friends.length}</span>
                    <span className={styles.statLabel}>Friends</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h3>Upcoming Events</h3>
                <Link to="/event" className={styles.seeAllLink}>See all</Link>
              </div>
              
              {events.length > 0 ? (
                <div className={styles.eventsList}>
                  {events.slice(0, 3).map(event => (
                    <div key={event._id} className={styles.eventCard}>
                      <div className={styles.eventImageContainer}>
                        {event.picture ? (
                          <img 
                            src={event.picture} 
                            alt={event.name} 
                            className={styles.eventImage} 
                          />
                        ) : (
                          <div className={styles.eventImagePlaceholder}>
                            <FaCalendarAlt />
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.eventDetails}>
                        <h4 className={styles.eventName}>{event.name}</h4>
                        <p className={styles.eventDate}>
                          {new Date(event.start_date).toLocaleDateString()}
                        </p>
                        <p className={styles.eventLocation}>
                          <FaMapMarkerAlt className={styles.locationIcon} />
                          {event.location}
                        </p>
                      </div>
                      
                      <Link 
                        to={`/event/${event._id}`} 
                        className={styles.viewEventButton}
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>You don't have any upcoming events.</p>
                  <Link to="/event" className={styles.createButton}>
                    <FaPlus className={styles.createIcon} />
                    Find Events
                  </Link>
                </div>
              )}
            </div>
            
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h3>Friend Requests</h3>
              </div>
              
              {friendRequests.length > 0 ? (
                <div className={styles.friendRequestsList}>
                  {friendRequests.map(request => (
                    <div key={request._id} className={styles.friendRequestCard}>
                      <div className={styles.requestAvatar}>
                        {request.username1.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className={styles.requestDetails}>
                        <p className={styles.requestUsername}>{request.username1}</p>
                        <p className={styles.requestDate}>
                          Sent on {new Date(request.connectionRequestDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <button 
                        className={styles.acceptButton}
                        onClick={() => handleAcceptFriendRequest(request._id)}
                      >
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>You don't have any friend requests.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'events' && (
          <div className={styles.eventsTabContent}>
            <div className={styles.sectionHeader}>
              <h2>My Events</h2>
              <Link to="/create-event" className={styles.createEventButton}>
                <FaPlus className={styles.createIcon} />
                Create Event
              </Link>
            </div>
            
            {events.length > 0 ? (
              <div className={styles.eventsList}>
                {events.map(event => {
                  const userTicket = userTickets.find(t => t.EventID === event._id);
                  
                  return (
                    <div key={event._id} className={styles.eventCard}>
                      <div className={styles.eventImageContainer}>
                        {event.picture ? (
                          <img 
                            src={event.picture} 
                            alt={event.name} 
                            className={styles.eventImage} 
                          />
                        ) : (
                          <div className={styles.eventImagePlaceholder}>
                            <FaCalendarAlt />
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.eventDetails}>
                        <div className={styles.eventHeader}>
                          <h3 className={styles.eventName}>{event.name}</h3>
                          <span className={`${styles.eventRole} ${styles[userTicket?.role || 'attendee']}`}>
                            {userTicket?.role || 'attendee'}
                          </span>
                        </div>
                        
                        <p className={styles.eventDescription}>
                          {event.description}
                        </p>
                        
                        <div className={styles.eventMeta}>
                          <p className={styles.eventDate}>
                            <FaCalendarAlt className={styles.icon} />
                            {new Date(event.start_date).toLocaleDateString()}
                          </p>
                          <p className={styles.eventLocation}>
                            <FaMapMarkerAlt className={styles.icon} />
                            {event.location}
                          </p>
                        </div>
                        
                        <Link 
                          to={`/event/${event._id}`} 
                          className={styles.viewEventButton}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>You don't have any events yet.</p>
                <Link to="/create-event" className={styles.createButton}>
                  <FaPlus className={styles.createIcon} />
                  Create Your First Event
                </Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'tickets' && (
          <div className={styles.ticketsTabContent}>
            <h2>My Tickets</h2>
            
            {userTickets.length > 0 ? (
              <div className={styles.ticketsList}>
                {userTickets.map(ticket => {
                  const event = events.find(e => e._id === ticket.EventID);
                  
                  if (!event) return null;
                  
                  return (
                    <div key={ticket._id} className={styles.ticketCard}>
                      <div className={styles.ticketHeader}>
                        <h3 className={styles.ticketTitle}>{event.name}</h3>
                        <span className={`${styles.ticketRole} ${styles[ticket.role]}`}>
                          {ticket.role}
                        </span>
                      </div>
                      
                      <div className={styles.ticketDetails}>
                        <div className={styles.ticketDetail}>
                          <span className={styles.detailLabel}>Date:</span>
                          <span className={styles.detailValue}>
                            {new Date(event.start_date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className={styles.ticketDetail}>
                          <span className={styles.detailLabel}>Location:</span>
                          <span className={styles.detailValue}>{event.location}</span>
                        </div>
                        
                        <div className={styles.ticketDetail}>
                          <span className={styles.detailLabel}>Ticket ID:</span>
                          <span className={styles.detailValue}>{ticket._id}</span>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/event/${event._id}`} 
                        className={styles.viewEventButton}
                      >
                        View Event
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>You don't have any tickets yet.</p>
                <Link to="/event" className={styles.createButton}>
                  <FaPlus className={styles.createIcon} />
                  Browse Events
                </Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'friends' && (
          <div className={styles.friendsTabContent}>
            <h2>My Friends</h2>
            
            {friends.length > 0 ? (
              <div className={styles.friendsList}>
                {friends.map(friend => {
                  // Determine which username is the friend
                  const friendUsername = friend.username1 === userData.username 
                    ? friend.username2 
                    : friend.username1;
                  
                  return (
                    <div key={friend._id} className={styles.friendCard}>
                      <div className={styles.friendAvatar}>
                        {friendUsername.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.friendInfo}>
                        <h4 className={styles.friendName}>{friendUsername}</h4>
                        <span className={styles.friendSince}>
                          Friends since {new Date(friend.connectionAcceptDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>You don't have any friends yet.</p>
                <Link to="/users" className={styles.createButton}>
                  <FaPlus className={styles.createIcon} />
                  Find Friends
                </Link>
              </div>
            )}
            
            {friendRequests.length > 0 && (
              <div className={styles.friendRequestsSection}>
                <h3>Friend Requests</h3>
                <div className={styles.friendRequestsList}>
                  {friendRequests.map(request => (
                    <div key={request._id} className={styles.friendRequestCard}>
                      <div className={styles.requestAvatar}>
                        {request.username1.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className={styles.requestDetails}>
                        <p className={styles.requestUsername}>{request.username1}</p>
                        <p className={styles.requestDate}>
                          Sent on {new Date(request.connectionRequestDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <button 
                        className={styles.acceptButton}
                        onClick={() => handleAcceptFriendRequest(request._id)}
                      >
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'venues' && (
          <div className={styles.venuesTabContent}>
            <h2>Venues</h2>
            
            <div className={styles.venueSearch}>
              <input 
                type="text" 
                className={styles.venueSearchInput}
                placeholder="Search for venues..."
              />
            </div>
            
            <div className={styles.venuesList}>
              {/* This will be populated after fetching venues data */}
              <div className={styles.emptyState}>
                <p>Explore venues for your next event.</p>
                <Link to="/venues" className={styles.createButton}>
                  <FaPlus className={styles.createIcon} />
                  Browse Venues
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
