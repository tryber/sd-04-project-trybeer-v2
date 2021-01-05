import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Context } from '../../context';

import { NUMBER_ZERO } from '../../validation';

import './styles.css';

const Rodape = () => {
  const history = useHistory();
  const { totalCarrinho, seTotalCarrinho } = useContext(Context);

  useEffect(() => {
    const totalCompra = JSON.parse(localStorage.getItem('totalCarrinho'));
    if (totalCompra) {
      seTotalCarrinho(totalCompra);
    }
  }, [seTotalCarrinho]);

  return (
    <div className="mobile-footer">
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        disabled={ totalCarrinho === NUMBER_ZERO }
        onClick={ () => history.push('/checkout') }
      >
        Ver Carrinho&nbsp;
        <span data-testid="checkout-bottom-btn-value">
          {totalCarrinho.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </span>
      </button>
    </div>
  );
};

export default Rodape;
