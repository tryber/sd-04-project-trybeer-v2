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
      .then(response => setOrder([response.data]))
      .catch(() => history.push('/login'));
  }, [params.id]);

  if (!order) return <div>Carregando...</div>

  return (
    <div>
      <TopBar data-testid="top-title" title={'Detalhes do Pedido'} isAdm={false} isDetails={true} />
      <div className="container">
        <div className="header">
          <p data-testid="order-number" className="order-name">Pedido {order[0].sale_id}</p>
          <p data-testid="order-date" className="order-date">
            {new Date(order[0].sale_date)
              .toLocaleDateString('pt-BR').slice(0, 5)}
            {console.log('aqui jaz o Order', order)}
          </p>
        </div>
        <div>
          {order[0].products.map((p, index) => (
            <div key={`${index}item`}>
              <div>
                <div className="products">
                  <span data-testid={`${index}-product-qtd`}>{p.salesProducts.quantity}</span>
                  <span data-testid={`${index}-product-name`}>{p.name}</span>
                  <span data-testid={`${index}-product-total-value`}>
                    {`R$ ${(p.price * p.salesProducts.quantity).toFixed(2).toString().replace('.', ',')}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <h6 data-testid="order-total-value">
            Total: {`R$ ${order[0].total_price.toFixed(2).toString().replace('.', ',')}`}
          </h6>
        </div>
      </div>
    </div >
  )

};

export default Details;
