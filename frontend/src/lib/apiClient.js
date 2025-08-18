import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const api = {
  // Car endpoints
  getAllCars: () => apiClient.get('/api/veiculos'),
  getCarById: (id) => apiClient.get(`/api/veiculos/${id}`),
  searchCars: (query) => apiClient.get(`/api/veiculos/find?q=${query}`),
  addCar: (car) => apiClient.post('/api/veiculos', car),
  updateCar: (car) => apiClient.put('/api/veiculos', car),
  updateCarPartial: (id, car) => apiClient.patch(`/api/veiculos/${id}`, car),
  deleteCar: (id) => apiClient.delete(`/api/veiculos/${id}`),
};

export default api;