// src/pages/Events.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";          // or you can use fetch
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    // Fetch all events from your backend
    // Adjust the URL/port to match your server if needed
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/manage/viewEvents");
        // The backend returns { message, Events }, so:
        setEvents(response.data.Events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Filter the events by search term and status
  const filteredEvents = events.filter((event) => {
    // Match name or location or description with searchTerm
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    // If statusFilter is empty, it means "show all"
    const matchesStatus = statusFilter ? event.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Events</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "1rem" }}
      />

      {/* Filter by status */}
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

      {/* Render event cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
