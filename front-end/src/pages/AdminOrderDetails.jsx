import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getSalesById, sendPutStatus } from '../services/TrybeerApi';
import '../css/adminOrderDetails.css';

const sendRequest = (id) => getSalesById(id);

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [saleInfo, setSaleInfo] = useState({ total_price: 0 });
  const [saleProduct, setSaleProduct] = useState([]);
  const [saleStatus, setSaleStatus] = useState();
  const { total_price: totalPrice } = saleInfo;

  useEffect(() => {
    sendRequest(id).then((result) => {
      setSaleInfo(result.data.sale);
      setSaleStatus(result.data.sale.status);
      setSaleProduct(result.data.products);
    });
  }, [id]);

  return (
    <div className="page">
      <Header>Trybeer</Header>
      <div className="marginDetails">
        <div className="cardDetailsA">
          <div className="pedido">
            <span
              className="titleOne"
              data-testid="order-number"
            >
              {`Pedido ${saleInfo.id}`}
            </span>
            <span
              className="titleOne"
              data-testid="order-status"
            >
              {`${saleStatus}`}
            </span>
          </div>
          <div className="listOrders">
            {saleProduct.map(({ name, quantity, price }, index) => (
              <div key={ name }>
                <span
                  className="element-orders-detail"
                  data-testid={ `${index}-product-qtd` }
                >
                  {`${quantity} - `}
                </span>
                <span
                  className="element-orders-detail"
                  data-testid={ `${index}-product-name` }
                >
                  {`${name} - `}
                </span>
                <span
                  className="element-orders-detail"
                  data-testid={ `${index}-product-total-value` }
                >
                  {`R$ ${(price * quantity).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}`}
                </span>
                <span
                  className="product-unit-price element-orders-detail"
                  data-testid={ `${index}-order-unit-price` }
                >
                  {`(R$ ${price.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}`}
                  )
                </span>
              </div>
            ))}
          </div>

          <h3 data-testid="order-total-value">
            {`Total: R$ ${totalPrice.toString().replace('.', ',')}0`}
          </h3>

          <button
            type="button"
            data-testid="mark-as-delivered-btn"
            onClick={ () => sendPutStatus(id).then(setSaleStatus('Entregue')) }
            className={ `sale-${saleStatus}-btn` }
          >
            Marcar como entregue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
