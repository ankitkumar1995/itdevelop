import axios from 'axios';
import { BASE_URL } from '../../../pages/api/url';

export const fileUpload = async (files) => {
  const formData = new FormData();
  for (let file of files) {
    formData.append('files', file);
  }
  const response = await axios.post(`${BASE_URL}/api/v1/file/upload`, formData);
  return { files: response.data.data, status: response.status };
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

//Helper functions for getFilledPercentage
const checkIsFilled = (value, type) => {
  switch (type) {
    case 'string':
      return value.length > 0;
    case 'number':
      return typeof value === 'number';
    case 'boolean':
      return typeof value === 'boolean';
    case 'array':
      return value.length > 0;
    default:
      return false;
  }
};

// Recurrsion Function which check how much object is filled
export const getFilledPercentage = (obj) => {
  return new Promise(async (resolve) => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
      return resolve(0);
    let percentage = 0;
    let perParam = 100 / Object.keys(obj).length;
    for (let item in obj) {
      if (typeof obj[item] === 'object' && !Array.isArray(obj[item])) {
        const filled = await getFilledPercentage(obj[item]);
        if (filled === 100) {
          percentage += perParam;
        } else {
          percentage += (perParam * filled) / 100;
        }
      } else {
        const filled = checkIsFilled(
          obj[item],
          Array.isArray(obj[item]) ? 'array' : typeof obj[item]
        );
        if (filled) {
          percentage += perParam;
        }
      }
    }
    return resolve(percentage);
  });
};
