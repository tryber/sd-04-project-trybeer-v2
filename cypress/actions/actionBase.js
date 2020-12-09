export function verifyContainsText(text) {
  cy.contains(text).should('be.visible');
}

export function verifyElementContainsText(element, text) {
  cy.get(element).contains(text);
}

export function verifyElementContainsAttribute(element, attribute) {
  cy.get(element).should('have.attr', attribute)
}

export function verifyElementNotContainsAttribute(element, attribute) {
  cy.get(element).should('not.have.attr', attribute)
}

export function verifyNotContainsText(text) {
  cy.contains(text).should('not.exist')
}

export function clickLinkOrText(text) {
  cy.contains(text).first().click();
}

export function clickLastElement(element) {
  cy.get(element).last().click();
}

export function clickButton(element) {
  cy.get(element).click();
}

export function checkElement(element){
  cy.get(element).check();
}

export function verifyElementVisible(element) {
  cy.get(element).should('to.be.visible');
}

export function verifyElementNotVisible(element) {
  cy.get(element).should('not.be.visible');
}

export function verifyElementIsDisable(element) {
  cy.get(element).should('be.disabled');
}

export function verifyContainsUrl(url) {
  cy.url().should('includes', url);
}

export function getValueInput(element, text) {
  cy.get(element).should('have.value', text);
}

export function insertText(element, text) {
  cy.get(element).type(text);
}

export function login(email, password) {
  insertText('[data-testid="email-input"]', email);
  insertText('[data-testid="password-input"]', password);
  clickButton('[data-testid="signin-btn"]');
}

export function accessOrdersClient(){
  clickButton('[data-testid="top-hamburguer"]');
  clickButton('[data-testid="side-menu-item-my-orders"]');
}

export function accessOrdersAdmin(){
  clickButton('[data-testid="side-menu-item-orders"]');
}

export function accessProfileClient(){
  clickButton('[data-testid="top-hamburguer"]');
  clickButton('[data-testid="side-menu-item-my-profile"]');
}

export function accessChatClient(){
  clickButton('[data-testid="top-hamburguer"]');
  clickButton('[data-testid="side-menu-chat"]');
}

export function getHour(){
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const tt = `${date.getHours()}:${('0'+new Date().getMinutes()).slice(-2)}`
  return tt;
}

export function loginAndAddProductInCart(email, password) {
  insertText('[data-testid="email-input"]', email);
  insertText('[data-testid="password-input"]', password);
  clickButton('[data-testid="signin-btn"]');
  clickButton('[data-testid="0-product-plus"]');
  clickButton('[data-testid="checkout-bottom-btn"]');
}

export function buyOneProduct() {
  clickButton('[data-testid="0-product-plus"]');
  clickButton('[data-testid="checkout-bottom-btn"]');
  insertText('[data-testid="checkout-street-input"]', 'Rua da pinga');
  insertText('[data-testid="checkout-house-number-input"]', '2');
  clickButton('[data-testid="checkout-finish-btn"]');
  verifyContainsText('Compra realizada com sucesso!');
}

export function loginClientAndBuyProduct(){
  login(Cypress.env('login'), Cypress.env('password'));
  buyOneProduct();
}

export function buyProducts() {
  clickButton('[data-testid="0-product-plus"]');
  clickButton('[data-testid="0-product-plus"]');
  clickButton('[data-testid="checkout-bottom-btn"]');
  insertText('[data-testid="checkout-street-input"]', 'Rua da pinga');
  insertText('[data-testid="checkout-house-number-input"]', '2');
  clickButton('[data-testid="checkout-finish-btn"]');
  verifyContainsText('Compra realizada com sucesso!');
}

export function logout() {
  clickButton('[data-testid="top-hamburguer"]');
  clickButton('[data-testid="side-menu-item-logout"]');
}

export function logoutAdmin() {
  clickButton('[data-testid="side-menu-item-logout"]');
}

export function accessHomeAndLogin(){
  cy.visit(Cypress.config().baseUrl);
  login(Cypress.env('login'), Cypress.env('password'));
}

export function getDateAndMonth() {
  const date = new Date();
  const dateAndMonth = `${("0" + (date.getDate())).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}`
  return dateAndMonth;
}

export function clientSendMessage() {
  accessHomeAndLogin();
  accessChatClient();
  insertText('[data-testid="message-input"]', 'Como anda meu pedido?');
  clickButton('[data-testid="send-message"]');
  logout();
}
