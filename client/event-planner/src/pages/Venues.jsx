// src/pages/Venues.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import VenueCard from "../components/VenueCard";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all venues from your backend
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:3001/venues/viewVenues");
        // The backend returns { message, Venues }, so:
        setVenues(response.data.Venues || []);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  // Filter the venues by name/location/type using the searchTerm
  const filteredVenues = venues.filter((venue) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      venue.name.toLowerCase().includes(lowerSearchTerm) ||
      venue.location.toLowerCase().includes(lowerSearchTerm) ||
      venue.type.toLowerCase().includes(lowerSearchTerm)
    );
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Venues</h1>

      {/* Simple search input */}
      <input
        type="text"
        placeholder="Search venues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "1rem" }}
      />

      {/* Render venue cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {filteredVenues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default Venues;
