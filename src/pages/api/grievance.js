import axios from 'axios';
import { BASE_URL } from './url';

export const getGrievance = async (number) => {
  const result = await axios.get(`${BASE_URL}/api/v1/grievance/${number}`);
  return result;
};

export const createGrievance = async (data) => {
  const result = await axios.post(`${BASE_URL}/api/v1/grievance/create`, data);
  return result;
};
