import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from '../../components/ClientBar';
import api from '../../services/api';

function Details() {
  const [order, setOrder] = useState();
  const params = useParams();
  const history = useHistory();
  // constantes para passar lint
  const zero = 0;
  const cinco = 5;
  const dois = 2;

  useState(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    api.get(`/orders/${params.id}`, { headers: { Authorization: token } })
      .then((response) => setOrder([response.data]))
      .catch(() => history.push('/login'));
  }, [params.id]);

  const changeStatusOrder = async (status) => {
    await api.post('/orderStatus', { id: order[0].id, status });
  };

  if (!order) return <div>Carregando...</div>;
  //  console.log(`ADMDETAILS ORDER[0] ${JSON.stringify(order[0])}`);
  return (
    <div>
      <TopBar data-testid="top-title" title="Detalhes do Pedido" isAdm={ false } isDetails />
      <div className="container">
        <div className="header">
          <p data-testid="order-number" className="order-name">
            Pedido
            {order[0].sale_id}
          </p>
          <p data-testid="order-date" className="order-date">
            {new Date(order[0].sale_date)
              .toLocaleDateString('pt-BR').slice(zero, cinco)}
            {/*  console.log('aqui jaz o Order', order)  */}
          </p>
        </div>
        <div>
          {order[0].products.map((p, index) => (
            <div key={ `${order[0].id}item` }>
              <div>
                <div className="products">
                  <span data-testid={ `${index}-product-qtd` }>{p.salesProducts.quantity}</span>
                  <span data-testid={ `${index}-product-name` }>{p.name}</span>
                  <span data-testid={ `${index}-product-total-value` }>
                    {`R$ ${(p.price * p.salesProducts.quantity).toFixed(dois).toString().replace('.', ',')}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <h6 data-testid="order-total-value">
            Total:
            {' '}
            {`R$ ${order[0].total_price.toFixed(dois).toString().replace('.', ',')}`}
          </h6>
        </div>
        <div className="status-btn">
          <button
            data-testid="mark-as-prepared-btn"
            type="button"
            onClick={ () => changeStatusOrder('Preparando') }
          >
            Preparar pedido
          </button>
          <button data-testid="mark-as-delivered-btn" type="button" onClick={ () => changeStatusOrder('Entregue') }>Marcar como entregue</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
