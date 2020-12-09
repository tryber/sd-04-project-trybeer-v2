import {
  loginClientAndBuyProduct,
  verifyContainsText,
  clickButton,
  logout, 
  login,
  logoutAdmin,
  accessOrdersAdmin,
  accessOrdersClient,
} from '../actions/actionBase';
        
describe('Desenvolver os status para o pedido da tela de Detalhe pedido Cliente', () => {
  beforeEach(() => {
    cy.exec('cd back-end && npx sequelize-cli db:drop');
    cy.exec('cd back-end && npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    cy.exec('cd back-end && npx sequelize-cli db:seed:all $');
    cy.visit(`${Cypress.config().baseUrl}/login`);
    loginClientAndBuyProduct();
    logout();
  });
  
  it('Dado que é feito uma compra, será validado que ela está com status `Pendente` na tela de `Detalhes do pedido` do cliente', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    accessOrdersClient();
    verifyContainsText('Pendente');
    clickButton('[data-testid="0-order-number"]');
    verifyContainsText('Pendente');
  });

  it('Dado que o admin marcou o pedido como `Preparando` é verificado que na tela de `detalhe do pedido` do cliente o status mudou para `Preparando`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    clickButton('[data-testid="mark-as-prepared-btn"]');
    logoutAdmin();
    login(Cypress.env('login'), Cypress.env('password'));
    accessOrdersClient();
    clickButton('[data-testid="0-order-number"]');
    verifyContainsText('Preparando');
  });

  it('Dado que o admin marcou o pedido como `Entregue` é verificado que na tela de `detalhe do pedido` do cliente o status mudou para `Entregue`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    clickButton('[data-testid="mark-as-delivered-btn"]');
    logoutAdmin();
    login(Cypress.env('login'), Cypress.env('password'));
    accessOrdersClient();
    clickButton('[data-testid="0-order-number"]');
    verifyContainsText('Entregue');
  });
});
