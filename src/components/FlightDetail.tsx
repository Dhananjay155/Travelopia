import React, { useEffect, useState } from 'react';
import { getFlightById } from '../services/flightService';
import { Flight } from '../types';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 

const FlightDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [flight, setFlight] = useState<Flight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); 

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode); 
  };

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const flightId = Number(id); 
        const data = await getFlightById(flightId); 
        setFlight(data);
      } catch (error) {
        console.error('Error fetching flight details:', error);
        setError('Failed to fetch flight details.');
      }
    };

    fetchFlightDetails();
  }, [id]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!flight) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="flight-detail-container">
      <Navbar toggleTheme={toggleTheme} />
      <h1 className="flight-title">Flight {flight.flightNumber} Details</h1>
      <div className="flight-detail-card">
        <p><strong>Airline:</strong> {flight.airline}</p>
        <p><strong>Origin:</strong> {flight.origin}</p>
        <p><strong>Destination:</strong> {flight.destination}</p>
        <p><strong>Departure Time:</strong> {flight.departureTime}</p>
        <p><strong>Status:</strong> {flight.status}</p>
      </div>
      <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button> 
    </div>
  );
};

export default FlightDetail;
