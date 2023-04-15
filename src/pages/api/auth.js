import axios from 'axios';
import { BASE_URL } from './url';

export const forgetPassword = async (emailData) => {
  const result = await axios.post(
    `${BASE_URL}/api/v1/user/password/forget`,
    emailData
  );

  return result;
};
export const EmailActivate = async (emailData) => {
  const result = await axios.post(`${BASE_URL}/api/v1/auth/account`, emailData);

  return result;
};

export const signUp = async (data) => {
  const result = await axios.post(`${BASE_URL}/api/v1/auth/signup`, data);
  return result;
};

export const resetPassword = async (data) => {
  const result = await axios.post(
    `${BASE_URL}/api/v1/user/password/reset`,
    data
  );
  return result;
};
