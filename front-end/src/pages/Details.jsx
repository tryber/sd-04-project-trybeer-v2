import React, { useState } from 'react';
import TopBar from '../components/ClientBar.jsx';
import { useHistory, useParams } from 'react-router-dom';
import api from '../services/api.js';
import './Details.css';

function Details() {
  const [order, setOrder] = useState();
  const params = useParams();
  const history = useHistory();

  useState(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    api.get(`/orders/${params.id}`, { headers: { Authorization: token } })
      .then(response => setOrder(response.data))
      .catch(() => history.push('/login'));
  }, [params.id]);

  if (!order) return <div>Carregando...</div>

  return (
    <div>
      <TopBar data-testid="top-title" title={'Detalhes do Pedido'} isAdm={false} isDetails={true} />
      <div className="container">
        <div className="header">
          <p data-testid="order-number" className="order-name">Pedido {order[0].saleID}</p>
          <p data-testid="order-date" className="order-date">
            {new Date(order[0].saleDate)
              .toLocaleDateString('pt-BR').slice(0, 5)}
            {console.log(order)}
          </p>
        </div>
        <div>
          {order.map((p, index) => (
            <div key={`${index}item`}>
              <div>
                <div className="products">
                  <span data-testid={`${index}-product-qtd`}>{p.quantity}</span>
                  <span data-testid={`${index}-product-name`}>{p.product}</span>
                  <span data-testid={`${index}-product-total-value`}>
                    {`R$ ${(p.price * p.quantity).toFixed(2).toString().replace('.', ',')}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <h6 data-testid="order-total-value">
            Total: {`R$ ${order[0].totalPrice.toFixed(2).toString().replace('.', ',')}`}
          </h6>
        </div>
      </div>
    </div >
  )

};

export default Details;
