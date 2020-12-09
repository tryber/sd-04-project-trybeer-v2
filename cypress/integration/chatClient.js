import {
  clickButton,
  login,
  verifyElementVisible,
  verifyElementContainsText,
  insertText,
  accessChatClient,
  getHour,
} from '../actions/actionBase';

describe('Desenvolver funcionalidade de chat na visão de cliente', () => {
  beforeEach( () => {
    cy.exec('cd back-end && npx sequelize-cli db:drop');
    cy.exec('cd back-end && npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    cy.exec('cd back-end && npx sequelize-cli db:seed:all $');
    cy.task('deleteCollection', 'messages');
    cy.visit(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('login'), Cypress.env('password'));
  });
  
  it('Será validado que existe o campo input e o botão de enviar mensagem', () => {
    accessChatClient();
    verifyElementVisible('[data-testid="message-input"]');
    verifyElementVisible('[data-testid="send-message"]');
  });

  it('Será validado que ao enviar mensagem o `nickname` do cliente é o seu email', () => {
    accessChatClient();
    insertText('[data-testid="message-input"]', 'Como anda meu pedido?');
    clickButton('[data-testid="send-message"]');
    verifyElementVisible('[data-testid="nickname"]');
    verifyElementContainsText('[data-testid="nickname"]', 'zebirita@gmail.com');
  });

  it('Será validado que ao enviar mensagem a data fica visível na tela', () => {
    accessChatClient();
    insertText('[data-testid="message-input"]', 'Como anda meu pedido?');
    clickButton('[data-testid="send-message"]');
    verifyElementVisible('[data-testid="message-time"]');
    verifyElementContainsText('[data-testid="message-time"]', getHour());
  });

  it('Será validado que ao enviar mensagem a mensagem fica visível na tela', () => {
    accessChatClient();
    insertText('[data-testid="message-input"]', 'Como anda meu pedido?');
    clickButton('[data-testid="send-message"]');
    verifyElementVisible('[data-testid="message-time"]');
    verifyElementContainsText('[data-testid="text-message"]', 'Como anda meu pedido?');
  });

  it('Será validado que ê possivel enviar várias mensagens', () => {
    accessChatClient();
    insertText('[data-testid="message-input"]', 'Como anda meu pedido?')
    clickButton('[data-testid="send-message"]');
    verifyElementVisible('[data-testid="message-time"]');
    verifyElementContainsText('[data-testid="text-message"]', 'Como anda meu pedido?');
    insertText('[data-testid="message-input"]', 'Que dia vai chegar?')
    clickButton('[data-testid="send-message"]');
    verifyElementVisible('[data-testid="message-time"]');
    verifyElementContainsText('[data-testid="text-message"]', 'Que dia vai chegar?');
  });
});
