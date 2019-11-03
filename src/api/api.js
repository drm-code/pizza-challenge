import axios from 'axios';

const apiUrl = process.env.REACT_APP_API;

export default class Api {
  static getDashboardReport() {
    return axios.get(`${apiUrl}/getReport`);
  }

  static getPizzaSummary(data) {
    return axios.post(`${apiUrl}/pizzaSummary`, data);
  }

  static submitOrder(data) {
    return axios.post(`${apiUrl}/submitOrder`, data);
  }

  static getOrders() {
    return axios.get(`${apiUrl}/getOrders`);
  }

  static setOrderStatus(data) {
    return axios.post(`${apiUrl}/setStatus`, data);

  }
}
