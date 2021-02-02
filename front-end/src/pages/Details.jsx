import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from '../components/ClientBar';
import api from '../services/api';
import './Details.css';

const zero = 0;
const dois = 2;
const cinco = 5;

function Details() {
  const [order, setOrder] = useState();
  const params = useParams();
  const history = useHistory();

  useState(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    api.get(`/orders/${params.id}`, { headers: { Authorization: token } })
      .then((response) => setOrder([response.data]))
      .catch(() => history.push('/login'));
  }, [params.id]);

  if (!order) return <div>Carregando...</div>;

  console.log(`details order: ${JSON.stringify(order)}`);

  const productList = () => (
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
    </div>);

  return (
    <div>
      <TopBar
        data-testid="top-title"
        title="Detalhes do Pedido"
        isAdm={ false }
        isDetails
      />
      <div className="container">
        <div className="header">
          <p data-testid="order-number" className="order-name">
            { `Pedido ${order[0].id}` }
          </p>
          <p data-testid="order-date" className="order-date">
            {new Date(order[0].sale_date)
              .toLocaleDateString('pt-BR')
              .slice(zero, cinco)}
            { console.log(JSON.stringify(order)) }
          </p>
        </div>
        { productList() }
        <div className="total">
          <h6 data-testid="order-total-value">
            Total:
            {' '}
            {`R$ ${order[0].total_price
              .toFixed(dois)
              .toString()
              .replace('.', ',')}`}
          </h6>
        </div>
        <div className="status">
          <p data-testid="order-status">{order[0].status}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
