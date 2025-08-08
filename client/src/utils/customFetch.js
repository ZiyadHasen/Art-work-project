import axios from 'axios';
const customFetch = axios.create({
  baseURL: 'https://art-work-project.onrender.com/api/v1',
});

export default customFetch;
