import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Isso aqui cria o Contexto da nossa aplicação.
// Chamei de Context, mas você pode dar o nome que quiser.
const Context = createContext();

// Esse é o fornecedor do contexto da aplicação
const TrybeerContextProvider = ({ children }) => {
  // useState(false) isso define um estado booleano
  // o useState nos retorna um array com uma variável e uma função, respectivamente e nessa ordem.
  // Você define o que será seu estado nessa variável
  // Eu defini que fosse um booleano, mas pode ser um array, um objeto, um objeto de objetos...
  // um array de objetos, ou a estrutura de dados que você precisar e achar melhor pra trabalhar.
  const VALOR_INICIAL_CARRINHO = 0;
  const [meuEstado, setMeuEstado] = useState(false);
  const [totalCarrinho, seTotalCarrinho] = useState(VALOR_INICIAL_CARRINHO);
  const [cartState, setCartState] = useState([]);

  const contextValue = {
    meuEstado, // uma variável de estado
    setMeuEstado, // essa é a função que muda a variável de estado
    totalCarrinho,
    seTotalCarrinho,
    cartState,
    setCartState,
  };
  // No contexto você sempre retorna o Context criado usando a função createContext();
  // Daí você chama o provider desse contexto
  // e como valor você passa um objeto com suas variáveis de estado e funções que alteram elas
  // Children é o elemento que será envolvido com esse Context, no caso, nossa aplicação toda.
  return <Context.Provider value={ contextValue }>{ children }</Context.Provider>;
};

// Exporte o Context, pois você precisa dele quando for usar suas variáveis e funções
// Exporte o seu Provider, ele é quem vai encapsular a aplicação toda.
// Vou colocar o Provider no arquivo de routes.js
export { Context, TrybeerContextProvider as Provider };

TrybeerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
