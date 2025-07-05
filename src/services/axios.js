// src/axios.js
import axios from 'axios';
import {saveTokens, getTokens, clearTokens} from '../Auth/auth';

const api = axios.create({baseURL: 'https://reqres.in/api/'}); // demo server
api.defaults.headers.common['x-api-key'] = 'reqres-free-v1';

let refreshing = null; // promise memo so we queue parallel 401s

api.interceptors.request.use(async config => {
  const t = await getTokens();
  if (t?.token) config.headers.Authorization = `Bearer ${t.token}`;
  return config;
});

api.interceptors.response.use(
  r => r, // success passthrough
  async err => {
    const original = err.config;
    if (err.response?.status !== 401 || original._retry) throw err;

    original._retry = true; // avoid loop
    if (!refreshing) {
      refreshing = (async () => {
        const t = await getTokens();
        if (!t?.refresh) throw err;
        const {data} = await axios.post('https://reqres.in/api/refresh', {
          refresh: t.refresh,
        });
        const next = {
          token: data.token,
          refresh: data.refresh,
          expiresAt: Date.now() + 15 * 60 * 1000,
        };
        await saveTokens(next);
        refreshing = null;
        return next.token;
      })();
    }
    const newToken = await refreshing;
    original.headers.Authorization = `Bearer ${newToken}`;
    return api(original); // replay the original call
  },
);

export default api;
