import axios from 'axios';
import { Flight } from '../types';

const BASE_URL = 'https://flight-status-mock.core.travelopia.cloud/flights';

export const getFlights = async (): Promise<Flight[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getFlightById = async (id: string): Promise<Flight> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
