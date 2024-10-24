import React, { useEffect, useState } from 'react';
import { getFlights } from '../services/flightService';
import { Flight } from '../types';
import { useNavigate } from 'react-router-dom';

interface FlightTableProps {
  searchTerm: string;
}

const FlightTable: React.FC<FlightTableProps> = ({ searchTerm }) => {
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
    return <div className="error">{error}</div>;
  }

  const filteredFlights = flights.filter((flight) =>
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-responsive">
      <table>
        <thead className="sticky-header">
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
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
              <tr
                key={flight.id}
                onClick={() => navigate(`/flights/${flight.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.departureTime}</td>
                <td className={`status ${flight.status.toLowerCase()}`}>{flight.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>No flights found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
