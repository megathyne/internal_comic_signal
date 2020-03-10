// export async function getUsers() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   return response.json();
// }

// export async function login(user) {
//   const { username, password } = user;
//   // const response = await fetch('http://' + process.env.REACT_APP_API_URL + ':3000/auth/login');
//   const response = await fetch("http://localhost:3000/auth/signin", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ username, password })
//   });
//   return response.json();
// }
