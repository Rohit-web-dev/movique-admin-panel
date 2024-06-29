"use client"
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'eyJhbGciOiJIUzI1NiJ9'
  }
});

export default api;