import {
  insertText,
  clickButton,
  verifyContainsUrl,
} from '../actions/actionBase';
import { internet } from 'faker';

const FRONT_URL = `https://${Cypress.env('gitHubUser')}-front.herokuapp.com`

describe("Realizar o deploy do projeto back-end e front-end", () => {
  beforeEach(() => {
    cy.visit(`${FRONT_URL}/login`);
  });

  it('Sera validado se é possivel acessar a aplicação e verificar se estou na tela url de login', () => {
    verifyContainsUrl(`${FRONT_URL}/login`);
  });

  it('Será validado que é possível fazer cadastro de um cliente com sucesso e ser redirecionado para tela de produtos', () => {
    let randomEmail = internet.email();
    clickButton('[data-testid="no-account-btn"]');
    verifyContainsUrl(`${FRONT_URL}/register`);
    insertText('[data-testid="signup-name"]', 'brunobatistasilva');
    insertText('[data-testid="signup-email"]', randomEmail);
    insertText('[data-testid="signup-password"]', '123456');
    clickButton('[data-testid="signup-btn"]');
    verifyContainsUrl(`${FRONT_URL}/products`);
  });
});
