import { BASE_URL } from '../pages/api/url';

const BASE_URI = BASE_URL;

const serviceHandler = {
  get: async (url, headers = null) => {
    return await fetchRequest(url, 'GET', null, headers);
  },
  post: async (url, body = null, headers = null, signal = null) => {
    return await fetchRequest(url, 'POST', body, headers, signal);
  },
  put: async (url, body = null, headers = null, signal = null) => {
    return await fetchRequest(url, 'PUT', body, headers, signal);
  },
  delete: async (url, body = null, headers = null, signal = null) => {
    return await fetchRequest(url, 'DELETE', body, headers, signal);
  },
};

const fetchRequest = async (
  url,
  method,
  body = null,
  headers = null,
  signal = null
) => {
  url = BASE_URI + url;
  let request = {
    method: method,
  };
  if (signal !== null) {
    request.signal = signal;
  }

  if (body !== null) {
    request.headers = setHeaders({
      'Content-Type': 'application/json',
    });
    request.body = body;
  } else {
    request.headers = setHeaders({});
  }

  if (headers !== null) {
    request.headers = setHeaders(headers);
  }
  let status;

  return fetch(url, request)
    .then((response) => {
      return response.text().then((text) => {
        if (text) {
          try {
            return JSON.parse(text);
          } catch (error) {
            return text;
          }
        } else {
          return {};
        }
      });
    })
    .then((responseBody) => {
      return {
        status: responseBody.status, //status,
        message: responseBody.message,
        body: responseBody.data,
        errors: responseBody.errors,
      };
    })
    .catch((error) => {
      return { status: 500, body: error, result: false };
    });
};

const setHeaders = (headers) => {
  return {
    ...headers,
  };
};

export default serviceHandler;
