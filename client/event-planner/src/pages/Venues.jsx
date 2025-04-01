import { useEffect, useState } from "react";
import axios from "axios";

const Venues = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:3001/venues/viewVenues");
        setVenues(response.data.Venues);
      } catch (err) {
        console.error("Failed to fetch venues:", err);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="venuesPage">
      <h1> Venues List</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Type</th>
            <th>Available At</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue._id}>
              <td>{venue.name}</td>
              <td>{venue.location}</td>
              <td>{venue.capacity}</td>
              <td>{venue.type}</td>
              <td>{new Date(venue.available_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Venues;