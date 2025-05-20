import axios from 'axios';

const apiKey = 'c7601f41b7712a15c05610aca11acccd';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: apiKey,
    language: 'pt-BR',
  },
});

export default api;
