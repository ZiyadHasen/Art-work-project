import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_URL || 'http://localhost:5500';
console.log('[DEBUG] API_HOST=', API_HOST);
const baseURL = `${API_HOST.replace(/\/$/, '')}/api/v1`;

console.log('[DEBUG] VITE_API_URL=', import.meta.env.VITE_API_URL);
console.log('[DEBUG] axios baseURL=', baseURL);

const customFetch = axios.create({
  baseURL,
  withCredentials: true, // if you use cookies / auth
});

export default customFetch;
