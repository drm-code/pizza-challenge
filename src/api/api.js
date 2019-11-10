import axios from 'axios';

const apiUrl = process.env.REACT_APP_API;

export default class Api {
  static getPrices() {
    return axios.get(`${apiUrl}/getPrices`);
  }
  
  static submitOrder(data) {
    return axios.post(`${apiUrl}/submitOrder`, JSON.stringify(data));
  }

  static getDashboardReport() {
    return axios.get(`${apiUrl}/getDashboard`);
  }

  static getStatus() {
    return axios.get(`${apiUrl}/getStatus`);
  }

  static setOrderStatus(data) {
    return axios.post(`${apiUrl}/setStatus`, JSON.stringify(data));
  }
}
