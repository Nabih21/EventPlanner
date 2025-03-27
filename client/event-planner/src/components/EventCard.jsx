// src/components/EventCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to /event/:id
    navigate(`/event/${event._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        width: "250px",
        cursor: "pointer"
      }}
    >
      {/* You can replace this placeholder with a real image URL if your event has one */}
      <img
        src="https://via.placeholder.com/250x150"
        alt="Event"
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h2>{event.name}</h2>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Start Date:</strong> {new Date(event.start_date).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(event.end_date).toLocaleDateString()}</p>
    </div>
  );
};

export default EventCard;
