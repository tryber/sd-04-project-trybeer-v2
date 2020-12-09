import {
  loginClientAndBuyProduct,
  verifyContainsText,
  clickButton,
  logout, 
  login,
  accessOrdersAdmin,
  verifyElementContainsText,
} from '../actions/actionBase';
      
describe('Desenvolver os status para o pedido da tela `Pedidos` do Administrador', () => {
  beforeEach(() => {
    cy.exec('cd back-end && npx sequelize-cli db:drop');
    cy.exec('cd back-end && npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    cy.exec('cd back-end && npx sequelize-cli db:seed:all $');
    cy.visit(`${Cypress.config().baseUrl}/login`);
    loginClientAndBuyProduct();
    logout();
  });

  it('Dado que é feito uma compra, será validado que ela está com status `Pendente` na tela de `Pedidos` do admin', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    verifyContainsText('Pendente');
  });
 
  it('Dado que o pedido foi marcado como entregue será validado que na tela de `Pedidos` do admin, o status estará como `Entregue`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    clickButton('[data-testid="mark-as-delivered-btn"]');
    accessOrdersAdmin();
    verifyElementContainsText('[data-testid="0-order-status"]', 'Entregue');
  });

  it('Dado que o pedido foi marcado como preparando será validado que na tela de `Pedidos` do admin, o status estará como `Preparando`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    accessOrdersAdmin();
    clickButton('[data-testid="0-order-number"]');
    clickButton('[data-testid="mark-as-prepared-btn"]');
    accessOrdersAdmin();
    verifyElementContainsText('[data-testid="0-order-status"]', 'Preparando');  
  });
});
    