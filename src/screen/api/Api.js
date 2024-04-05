import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.237.95.204:3000/api/users/';

export const apiGetWithToken = async endpoint => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const apiGetWithoutToken = async endpoint => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const apiPostWithToken = async (endpoint, body) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const apiPostWithoutToken = async (endpoint, body) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

// Similarly, implement apiPutWithToken and apiDeleteWithToken functions
