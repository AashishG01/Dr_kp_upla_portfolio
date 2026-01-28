import axios from 'axios';

const baseURL = import.meta.env.PROD ? '/' : 'http://localhost:5000';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Auth Token Set:', token.substring(0, 10) + '...');
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

api.interceptors.request.use(request => {
    // console.log('Starting Request', request.url, request.headers);
    return request;
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    console.error('Request Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
});

export default api;
