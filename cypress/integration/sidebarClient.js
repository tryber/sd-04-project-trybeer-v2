import {
  clickButton,
  login,
  verifyElementVisible,
  verifyElementContainsText,
  verifyContainsUrl,
} from '../actions/actionBase';

describe('Criar um botão no sidebar para acessar o chat do cliente', () => {
  beforeEach( () => {
    cy.exec('cd back-end && npx sequelize-cli db:drop');
    cy.exec('cd back-end && npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    cy.exec('cd back-end && npx sequelize-cli db:seed:all $');
    cy.task('deleteCollection', 'messages');
    cy.visit(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('login'), Cypress.env('password'));
  });

  it('Será validado que o botão `Conversar com a loja` existe no sidebar do cliente', () => {
    clickButton('[data-testid="top-hamburguer"]');
    verifyElementVisible('[data-testid="side-menu-chat"]');
    verifyElementContainsText('[data-testid="side-menu-chat"]', 'Conversar com a loja');
  });

  it('Será validado que ao clicar no menu `Conversar com a loja` será redirecionado para página na url `/chat`', () => {
    clickButton('[data-testid="top-hamburguer"]');
    clickButton('[data-testid="side-menu-chat"]');
    verifyContainsUrl('http://localhost:3000/chat');
  });
});
