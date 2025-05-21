import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app.nocodb.com/api/v2',
  headers: {
    'Content-Type': 'application/json',
    'xc-token': import.meta.env.VITE_NOCO_TOKEN || ''
  },
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (key === 'where') {
        searchParams.append(key, value as string); 
      } else {
        searchParams.append(key, encodeURIComponent(value as string));
      }
    });
    return searchParams.toString();
  }
});

export default api;