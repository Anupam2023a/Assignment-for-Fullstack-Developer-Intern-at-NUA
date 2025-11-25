import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const userService = {
    //fetching all users
    getUsers() {
        return api.get('/users');
    },
    // Update user/Edit user
    updateUser(uuid, userData) {
        return api.put(`/users/${uuid}`, userData);
    },
    // Fetch users from public API and store in DB
    fetchUsers() {
        return api.post('/users/fetch');
    }
};

export default api;