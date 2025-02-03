import { API_URL } from "@/utils/urls";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


// const API_URL = "http://127.0.0.1:8000/api";
// export interface User {
//   id: number;
//   email: string;
//   name: string;
// }

// export interface LoginResponse {
//   token: string;
//   user: User;
// }
export async function login(email, password) {
  console.log(email, API_URL);
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    },{headers: {
          'Content-Type': 'application/json'
        }});
        console.log(response.data)
        const token = response.data.access_token;
        console.log(response.data);
        localStorage.setItem('access_token', token); 
          const user= jwtDecode(token);
    return {user,token};
  } catch (error) {
    console.log(error);
    console.error("Error en login:", error);
    return null;
  }
}

export async function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}

export async function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// const getToken=()=>{
//     if (localStorage) return localStorage.getItem('access_token');
//     return null
// }
//   const getUserType=()=> {
//     const token = getToken();
//     if (token) {
//       const decodedToken= jwtDecode(token);

//       if (localStorage) localStorage.setItem('user', JSON.stringify(decodedToken));
//       return decodedToken.user_type;
//     }
//     return null;
//   }
//   const isAdmin=()=> {
//     return getUserType() === 'admin';
//   }