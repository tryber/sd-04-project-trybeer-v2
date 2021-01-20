import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import SideMenuAdmin from '../../components/SideMenuAdmin';
import ProductDetailsCard from '../../components/ProductDetailsCard';

import api from '../../services/api';

import './styles.css';

const ProductDetailsADM = ({ match: { params: { orderNumber } } }) => {
  const [doneSales, setDoneSales] = useState('');
  const [statusNow, setStatus] = useState(false);

  const changeStatus = async (status) => {
    try {
      const response = await api.put(`/admin/orders/${orderNumber}`, { status });
      setDoneSales(response.data);
    } catch (error) {
      // console.log(error.response.data);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await api.get(`/admin/orders/${orderNumber}`);

      setStatus(true);
      setDoneSales(response.data[0]);
    };
    fetchProductDetails();
  }, [orderNumber]);

  return (
    <div>
      <div className="product-details-container">
        <SideMenuAdmin />
        <div className="order-details-card-container">
          <div className="order-detail-info">
            <p className="details-order-head">
              <span data-testid="order-number">
                {`Pedido ${doneSales.id}`}
              </span>
              <span data-testid="order-status">
                {`- ${statusNow && doneSales.status}`}
              </span>
            </p>
          </div>
          {doneSales.products
            && doneSales.products.map(({
              orderId, salesProducts, name, price,
            }, index) => (
              <ProductDetailsCard
                key={ orderId }
                testid={ index }
                quantity={ salesProducts.quantity }
                name={ name }
                uniPrice={ `(${(price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })})` }
                total={ (salesProducts.quantity * price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
              />
            ))}
          <p>
            Total: &nbsp;
            <span data-testid="order-total-value">
              {doneSales && doneSales.total_price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </span>
          </p>
        </div>
        {doneSales.status === 'Pendente' || doneSales.status === 'Preparando' ? (
          <div>
            <button type="button" data-testid="mark-as-prepared-btn" onClick={ () => changeStatus('Preparando') }>Preparar pedido</button>
            <button type="button" data-testid="mark-as-delivered-btn" onClick={ () => changeStatus('Entregue') }>Marcar como entregue</button>
          </div>
        ) : ('')}
      </div>
    </div>
  );
};

ProductDetailsADM.propTypes = {
  match: PropTypes.PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.string,
  }).isRequired,
};

export default ProductDetailsADM;
