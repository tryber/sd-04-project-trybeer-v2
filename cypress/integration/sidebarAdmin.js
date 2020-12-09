import {
  clickButton,
  login,
  verifyElementVisible,
  verifyElementContainsText,
  verifyContainsUrl,
} from '../actions/actionBase';
  
describe('Criar botão no sidebar para acessar a lista de chats do admin', () => {
  beforeEach( () => {
    cy.exec('cd back-end && npx sequelize-cli db:drop');
    cy.exec('cd back-end && npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    cy.exec('cd back-end && npx sequelize-cli db:seed:all $');
    cy.task('deleteCollection', 'messages');
    cy.visit(`${Cypress.config().baseUrl}/login`);
  });

  it('Será validado que no meu sidebar contém o botão `Conversas`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    verifyElementVisible('[data-testid="side-menu-item-chat"]');
    verifyElementContainsText('[data-testid="side-menu-item-chat"]', 'Conversas');
  });

  it('Será validado que ao clicar no menu `Conversas` será redirecionado para página na url `/admin/chats`', () => {
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    verifyContainsUrl('http://localhost:3000/admin/chats');
  });
});
