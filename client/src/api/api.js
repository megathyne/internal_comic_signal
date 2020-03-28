import { push } from 'connected-react-router';

const BASE_URL = 'http://192.168.50.138:3000/';

export async function APIGet(endpoint) {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const results = await response.json();

    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      push('/login');
    } else {
      return results;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function APIPost(endpoint, data) {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });
    const results = await response.json();

    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      push('/login');
    } else {
      return results;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function APIPatch(endpoint, data) {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });
    const results = await response.json();
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      push('/login');
    } else {
      return results;
    }
  } catch (error) {
    console.log(error);
  }
}
