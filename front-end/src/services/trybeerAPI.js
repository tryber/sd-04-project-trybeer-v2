import axios from 'axios';

const fiftyHundred = 500;

class UserService {
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
          error: { message: 'E-mail already in database.', code: 500 },
        };
        break;
      default:
        errorMsg = {
          error: {
            message: error.response.statusText,
            code: error.response.status,
          },
        };
        break;
    }

    throw errorMsg;
  }

  /** User login */
  async userLogin(body) {
    return this.http.post('/login', body);
  }

  /** User signup */
  async userSignup(userData) {
    const {
      email, name, password, admin,
    } = userData;

    const body = {
      email,
      name,
      password,
      role: admin ? 'administrator' : 'client',
    };

    return this.http.post('/register', body);
  }
  /** User Name Update */

  async userNameUpdate(email, name) {
    const body = {
      email,
      name,
    };

    return this.http.put('/', { body });
  }

  /** Get all products */
  async getProducts() {
    return this.http.get('/products');
  }

  /** Post one order */
  async postOrder(payload, token) {
    return this.http.post(
      '/sales',

      {
        ...payload,
      },
      {
        headers: {
          Authorization: token,
        },
      },
      {
        body: {},
      },
    );
  }

  /** Get all orders */
  async getOrders(token) {
    return this.http.get('/sales', {
      headers: {
        Authorization: token,
      },
    });
  }

  /** Get all Products from one (id) sale */

  async getSalesProducts(token, id) {
    const result = this.http.get(`/admin/orders/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return result;
  }

  /** Update  one (id) sale */
  async updateStatusSale(token, status, id) {
    return this.http.put(
      `/admin/orders/${id}`,
      { status },
      { headers: { Authorization: token } },
    );
  }
}

export default new UserService();
