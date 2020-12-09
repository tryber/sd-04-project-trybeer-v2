describe('Desenvolva a cobertura de testes unitários do front-end', () => {
  it('Será validado a cobertura de testes unitários do front-end', () => {
    cy.exec('npm --prefix front-end/ run test-coverage -- --coverageReporters="json-summary" --testFailureExitCode=0');
    cy.readFile('front-end/coverage/coverage-summary.json').its('total.lines.pct').should('be.gte', 90.00);
  });
});