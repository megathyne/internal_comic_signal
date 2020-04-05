import { push } from 'connected-react-router';

// const BASE_URL = 'http://192.168.50.138:3000/';
// const BASE_URL = 'http://192.168.50.130:3000/';
const BASE_URL = 'http://localhost:3000/';

export async function APIGet(endpoint, query) {
  try {
    let url = BASE_URL + endpoint;

    if (query) {
      url += '?';
      Object.keys(query).forEach(x => {
        url += x + '=' + query[x] + '&';
      });
    }

    const response = await fetch(url, {
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
