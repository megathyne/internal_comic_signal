
export async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}

export async function login(user) {
  const response = await fetch('http://' + process.env.REACT_APP_API_URL + ':3000/api/login');
  return response.json();
}
