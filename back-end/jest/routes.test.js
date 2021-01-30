const routes = require('../routes');

describe('Teste se existe as funções nescessárias no componente routes.js', () => {
  it('Verifica se existe a função Routes', () => {
    expect(routes).toBeDefined();
  });
  it('Verifica se Routes é uma função', () => {
    expect(typeof routes).toBe('function');
  });

  it('Verifica se o método GET foi usado', () => {
    expect(routes.get).toBeDefined();
  });

  it('Verifica se o método PUT foi usado', () => {
    expect(routes.put).toBeDefined();
  });

  it('Verifica se o método POST foi usado', () => {
    expect(routes.post).toBeDefined();
  });
});
