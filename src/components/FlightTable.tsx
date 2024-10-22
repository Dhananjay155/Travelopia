import React, { useEffect, useState } from 'react';
import { getFlights } from '../services/flightService';
import { Flight } from '../types';
import { useNavigate } from 'react-router-dom';

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const fetchFlights = async () => {
    try {
      const data = await getFlights();
      setFlights(data);
    } catch (error) {
        console.error('Error fetching flight details:', error);
        setError('Failed to fetch flight data.');
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 10000); 
    return () => clearInterval(interval); 
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const handleRowClick = (flightId: string) => {
    navigate(`/flights/${flightId}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Flight Number</th>
          <th>Airline</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Departure Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <tr 
            key={flight.id} 
            onClick={() => handleRowClick(flight.id)} 
            style={{ cursor: 'pointer' }} 
          >
            <td>{flight.flightNumber}</td>
            <td>{flight.airline}</td>
            <td>{flight.origin}</td>
            <td>{flight.destination}</td>
            <td>{flight.departureTime}</td>
            <td>{flight.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;
