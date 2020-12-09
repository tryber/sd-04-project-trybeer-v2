import {
  clickButton,
  login,
  verifyElementVisible,
  verifyElementContainsText,
  clientSendMessage,
  insertText,
  verifyContainsUrl,
  accessChatClient,
  getHour,
} from '../actions/actionBase';

describe('Desenvolver funcionalidade de chat na visão de administrador', () => {
  beforeEach( () => {
    cy.exec('cd back-end && npx sequelize-cli db:drop');
    cy.exec('cd back-end && npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    cy.exec('cd back-end && npx sequelize-cli db:seed:all $');
    cy.task('deleteCollection', 'messages');
    cy.visit(`${Cypress.config().baseUrl}/login`);
  });

  it('Será validado que ao clicar no card da conversa poderá ser visualizado as mensagem do cliente', () => {
    clientSendMessage();
    cy.visit(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    clickButton('[data-testid="profile-name"]');
    verifyElementVisible('[data-testid="nickname"]');
    verifyElementVisible('[data-testid="message-time"]');
    verifyElementVisible('[data-testid="text-message"]');
    verifyElementVisible('[data-testid="message-input"]');
    verifyElementVisible('[data-testid="send-message"]');
  });

  it('Será validado que é possivel enviar mensagem', () => {
    clientSendMessage();
    cy.visit(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    clickButton('[data-testid="profile-name"]');
    insertText('[data-testid="message-input"]', 'Opa caro cliente, será enviado hoje para o correio')
    clickButton('[data-testid="send-message"]');
    cy.reload();
    verifyElementContainsText('[data-testid="text-message"]', 'Opa caro cliente, será enviado hoje para o correio');
  });

  it('Será validado que ao enviar mensagem o nickname do admin e `Loja`', () => {
    clientSendMessage();
    cy.visit(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    clickButton('[data-testid="profile-name"]');
    insertText('[data-testid="message-input"]', 'Opa caro cliente, será enviado hoje para o correio');
    clickButton('[data-testid="send-message"]');
    verifyElementContainsText('[data-testid="nickname"]', 'Loja');
  });

  it('Será validado que ao enviar mensagem e listado a hora do envio da mensagem', () => {
    clientSendMessage();
    cy.visit(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    clickButton('[data-testid="profile-name"]');
    insertText('[data-testid="message-input"]', 'Opa caro cliente, será enviado hoje para o correio');
    clickButton('[data-testid="send-message"]');
    verifyElementContainsText('[data-testid="message-time"]', getHour());
  });

  it('Será validado que é possivel voltar pra tela de `admin/chat` através do botão voltar', () => {
    clientSendMessage();
    cy.visit(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    clickButton('[data-testid="profile-name"]');
    verifyElementVisible('[data-testid="back-button"]');
    clickButton('[data-testid="back-button"]');
    verifyContainsUrl('http://localhost:3000/admin/chats');
  });

  it('Será validado que é possivel enviar mensagem para o cliente e a mensagem poderá ser visualizada pelo cliente', () => {
    clientSendMessage();
    cy.visit(`${Cypress.config().baseUrl}/login`);
    login(Cypress.env('loginAdmin'), Cypress.env('passwordAdmin'));
    clickButton('[data-testid="side-menu-item-chat"]');
    cy.reload();
    clickButton('[data-testid="profile-name"]');
    insertText('[data-testid="message-input"]', 'Opa caro cliente, será enviado hoje para o correio');
    clickButton('[data-testid="send-message"]');
    clickButton('[data-testid="side-menu-item-logout"]');
    login(Cypress.env('login'), Cypress.env('password'));
    accessChatClient();
    verifyElementContainsText('[data-testid="text-message"]', 'Opa caro cliente, será enviado hoje para o correio');
  });
});
