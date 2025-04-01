// src/pages/VenueDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/venues/viewVenue/${id}`);
        // The backend returns { message, Venue }, so:
        setVenue(response.data.Venue);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchVenue();
  }, [id]);

  if (!venue) {
    return <div>Loading venue details...</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{venue.name}</h1>
      <p><strong>Location:</strong> {venue.location}</p>
      <p><strong>Capacity:</strong> {venue.capacity}</p>
      <p><strong>Type:</strong> {venue.type}</p>
      <p>
        <strong>Available At:</strong>{" "}
        {new Date(venue.available_at).toLocaleString()}
      </p>
      {/* Add any action button or extra details here */}
    </div>
  );
};

export default VenueDetails;
