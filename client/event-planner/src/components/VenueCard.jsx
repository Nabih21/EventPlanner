// src/components/VenueCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to /venue/:id for more details
    navigate(`/venue/${venue._id}`);
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
      {/* Replace with a real image if available */}
      <img
        src="https://via.placeholder.com/250x150"
        alt="Venue"
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h2>{venue.name}</h2>
      <p><strong>Location:</strong> {venue.location}</p>
      <p><strong>Type:</strong> {venue.type}</p>
      <p><strong>Capacity:</strong> {venue.capacity}</p>
    </div>
  );
};

export default VenueCard;
