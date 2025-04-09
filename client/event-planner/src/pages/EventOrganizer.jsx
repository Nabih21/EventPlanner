import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const EventOrganizer = () => {
  const [organizerEvents, setOrganizerEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchOrganizerEvents = async () => {
      try {
        // This endpoint needs to be implemented in the backend
        const response = await axios.get("http://localhost:3001/manage/organizerEvents", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token-based auth
          }
        });
        setOrganizerEvents(response.data.Events || []);
      } catch (error) {
        console.error("Error fetching organizer events:", error);
      }
    };

    fetchOrganizerEvents();
  }, []);

  const filteredEvents = organizerEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? event.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>My Organized Events</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "1rem" }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="planned">Planned</option>
          <option value="in progress">In Progress</option>
          <option value="finished">Finished</option>
          <option value="past">Past</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {filteredEvents.map((event) => (
          <EventCard 
            key={event._id} 
            event={event}
            isOrganizer={true} // This prop can be used to show organizer-specific options
            link={`/organizer/events/${event._id}`} // Link to OrganizerEventDetails
          />
        ))}
      </div>

      {/* Placeholder for future features */}
      <div style={{ marginTop: "2rem" }}>
        {/* User Management component will go here */}
        {/* Event Editing component will go here */}
      </div>
    </div>
  );
};

export default EventOrganizer;
