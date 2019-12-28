const BASE_URL = "http://localhost:3000/";

export async function APIGet(endpoint) {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
    const results = await response.json();

    if (results.statusCode === 401) {
      localStorage.removeItem("accessToken");
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify(data)
    });
    const results = await response.json();

    if (results.statusCode === 401) {
      localStorage.removeItem("accessToken");
    } else {
      return results;
    }
  } catch (error) {
    console.log(error);
  }
}
