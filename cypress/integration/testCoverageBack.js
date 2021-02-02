describe('Desenvolva a cobertura de testes unitários do back-end', () => {
  it('Será validado a cobertura de testes unitários do back-end', () => {
    cy.exec('npm --prefix back-end/ run test-coverage -- --coverageReporters="json-summary" --testFailureExitCode=0');
    cy.readFile('back-end/coverage/coverage-summary.json').its('total.lines.pct').should('be.gte', 90.00);
  });
});