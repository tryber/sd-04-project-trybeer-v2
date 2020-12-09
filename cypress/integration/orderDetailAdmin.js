import {
  loginClientAndBuyProduct,
  verifyContainsText,
  clickButton,
  logout, 
  login,
  accessOrdersAdmin,
  verifyElementVisible,
  verifyElementContainsText,
  verifyElementNotVisible,
} from '../actions/actionBase';
      
describe('Desenvolver os status para o pedido da tela de `Detalhe pedido` do Administrador', () => {
  beforeEach(() => {
    cy.exec('cd back-end && npx sequelize-cli db:drop');
    cy.exec('cd back-end && npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    cy.exec('cd back-end && npx sequelize-cli db:seed:all $');
    cy.visit(`${Cypress.config().baseUrl}/login`);
    loginClientAndBuyProduct();
    logout();
  });

  it('Dado que é feito uma compra, será validado que ela está com status `Pendente` na tela de `Detalhes do pedido` do admin', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    verifyContainsText('Pendente');
  });

  it('Será validado que o administrador ao acessar um determinado pedido ele deve visualizar o botão `Preparar pedido`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    verifyElementVisible('[data-testid="mark-as-prepared-btn"]');
    verifyElementContainsText('[data-testid="mark-as-prepared-btn"]', 'Preparar pedido');
  });

  it('Será validado que o administrador ao acessar um determinado pedido ele deve visualizar o botão `Marcar como entregue`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    verifyElementVisible('[data-testid="mark-as-delivered-btn"]');
    verifyElementContainsText('[data-testid="mark-as-delivered-btn"]', 'Marcar como entregue');
  });

  it('Quando clicar no botão `Preparar pedido` deve alterar o status do detalhe do pedido para `Preparando`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    clickButton('[data-testid="mark-as-prepared-btn"]');
    verifyContainsText('Preparando');
  });

  it('Quando clicar no botão `Marcar como entregue` deve alterar o status do detalhe do pedido para `Entregue`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    clickButton('[data-testid="mark-as-delivered-btn"]');
    verifyContainsText('Entregue');
  });

  it('Quando clicar no botão `Marcar como entregue` os botões `Preparar pedido` e `Marcar como entregue` devem sumir da tela', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    clickButton('[data-testid="mark-as-delivered-btn"]');
    verifyElementNotVisible('[data-testid="mark-as-delivered-btn"]');
    verifyElementNotVisible('[data-testid="mark-as-prepared-btn"]');
  });
});
    