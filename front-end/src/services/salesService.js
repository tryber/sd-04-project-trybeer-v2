import axios from 'axios';

const fiftyHundred = 500;

class SalesService {
  constructor() {
    const url = 'http://localhost:3001';
    const timeout = 30000;

    this.http = axios.create({
      baseURL: url,
      timeout,
    });

    // Define os handlers para tratamento de erro e sucesso
    this.http.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    let errorMsg;
    switch (error.response.status) {
      case fiftyHundred:
        errorMsg = {
          error: { message: 'Error getting sales details.', code: 500 },
        };
        break;

      default:
        break;
    }

    throw errorMsg;
  }

  /** Get sales */
  async getSales(token) {
    return this.http.get('/sales', { headers: { Authorization: token } });
  }
}

export default new SalesService();
