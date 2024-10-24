
import { Flight } from '../types';

const API_URL = 'https://flight-status-mock.core.travelopia.cloud/flights';

export const getFlights = async (): Promise<Flight[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch flights');
  }
  return response.json();
};

export const getFlightById = async (id: number): Promise<Flight | null> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Flight not found');
  }
  return response.json();
};
