const checkoutController = require('../controllers/checkoutController');
const {
  registerSalesProductsService,
} = require('../services/salesProductsService');
const {
  findSalesByUserId,
  findAllSalesService,
  findSalesBySaleId,
} = require('../services/saleService');

const db = require('../models');

describe('Testa a função checkoutController ', () => {
  const req = {
    user: {
      id: 1,
    },
    body: {
      total: {
        email: 'tryber@trybe.com.br',
        total: 15.0,
        address: 'Vila da Folha',
        number: 15,
        date: '2020-11-20T20:48:32.649Z',
        status: 'Pendente',
        products: [
          {
            productId: 8,
            quantity: 5,
          },
          {
            productId: 4,
            quantity: 5,
          },
        ],
      },
    },
  };

  const mockResponse = () => {
    const res = {
      send: jest.fn(),
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterAll(async (done) => {
    await db.sequelize.close();
    done();
  });

  try {
    it('Verifica se consegue realizar uma compra com sucesso', async (done) => {
      const res = mockResponse();
      await checkoutController(req, res);

      done();
    });

    it('teste', async () => {
      await registerSalesProductsService();
    });

    it('teste 2', async () => {
      await findSalesByUserId(1);
    });

    it('teste 3', async () => {
      await findAllSalesService();
    });

    it('teste 4', async () => {
      await findSalesBySaleId(1);
    });
  } catch (error) {
    return error;
  }
});
