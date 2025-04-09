import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{event.name}</h1>
      
      {/* Basic Event Information */}
      <div className="event-info">
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {event.status}</p>
        <p><strong>Description:</strong> {event.description}</p>
      </div>

      {/* Organizer-specific Controls */}
      <div className="organizer-controls" style={{ marginTop: "2rem" }}>
        <h2>Organizer Controls</h2>
        
        {/* Placeholder for User Role Management */}
        <div className="role-management">
          <h3>Manage Roles</h3>
          <button>Add Speaker</button>
          <button>Add Organizer</button>
        </div>

        {/* Placeholder for Materials Management */}
        <div className="materials-management" style={{ marginTop: "1rem" }}>
          <h3>Materials</h3>
          <button>Upload Material</button>
          {/* Material list will go here */}
        </div>

        {/* Placeholder for Event Editing */}
        <div className="event-editing" style={{ marginTop: "1rem" }}>
          <h3>Event Management</h3>
          <button>Edit Event Details</button>
        </div>
      </div>
    </div>
  );
};

export default OrganizerEventDetails;
