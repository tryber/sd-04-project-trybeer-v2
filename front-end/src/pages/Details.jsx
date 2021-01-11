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
    api
      .get(`/orders/${params.id}`, { headers: { Authorization: token } })
      .then((response) => setOrder(response.data))
      .catch(() => history.push('/login'));
  }, [params.id]);

  if (!order) return <div>Carregando...</div>;

  return (
    <div>
      <TopBar
        data-testid="top-title"
        title="Detalhes do Pedido"
        isAdm={false}
        isDetails
      />
      <div className="container">
        <div className="header">
          <p data-testid="order-number" className="order-name">
            Pedido
            {order[0].saleID}
          </p>
          <p data-testid="order-date" className="order-date">
            {new Date(order[0].saleDate)
              .toLocaleDateString('pt-BR')
              .slice(zero, cinco)}
            {/* console.log(order) */}
          </p>
        </div>
        <div>
          {order.map((p, index) => (
            <div key={`${p}item`}>
              <div>
                <div className="products">
                  <span data-testid={`${index}-product-qtd`}>{p.quantity}</span>
                  <span data-testid={`${index}-product-name`}>{p.product}</span>
                  <span data-testid={`${index}-product-total-value`}>
                    {`R$ ${(p.price * p.quantity)
                      .toFixed(dois)
                      .toString()
                      .replace('.', ',')}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <h6 data-testid="order-total-value">
            Total:{' '}
            {`R$ ${order[0].totalPrice
              .toFixed(dois)
              .toString()
              .replace('.', ',')}`}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Details;
