import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5173/sushi.json',
  timeout: 1000,
  headers: { Accept: 'application/json' },
});

export default instance;
