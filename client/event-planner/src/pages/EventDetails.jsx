import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/manage/viewEvent/${id}`);
        console.log("Single event response:", response.data); 
        setEvent(response.data.Event); 
      } catch (error) {
        console.error("Error fetching single event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading event details...</div>;
  }

  // If event is correctly set, you’ll see this:
  return (
    <div style={{ padding: "1rem" }}>
      <h1>{event.name}</h1>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Start Date:</strong> {new Date(event.start_date).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(event.end_date).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {event.status}</p>
      <button onClick={() => alert("Register button clicked! (No further action yet)")}>
        Register
      </button>
    </div>
  );
};

export default EventDetails;
