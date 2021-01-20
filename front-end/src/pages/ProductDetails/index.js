import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import ProductDetailCard from '../../components/ProductDetailsCard';

import api from '../../services/api';

import './styles.css';

const ProductDetails = ({ match: { params: { orderNumber } } }) => {
  const [product, setProduct] = useState('');
  const [dateFormat, setDateFormat] = useState('');
  const [statusNow, setStatusNow] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await api.get(`/orders/${orderNumber}`);
      setProduct(response.data[0]);
      setDateFormat(response.data[0].sale_date);
      setStatusNow(response.data[0].status);
    };
    fetchProductDetails();
  }, [orderNumber]);

  return (
    <div>
      <Header title="Detalhes de Pedido" />
      <div className="product-details-container">
        <div className="order-details-card-container">
          <div className="order-detail-info">
            <p className="details-order-head">
              <span data-testid="order-number">
                {`Pedido ${product.id}`}
              </span>
              <span data-testid="order-date">
                { dateFormat }
              </span>
            </p>
          </div>
          {product.products
            && product.products.map(({
              orderId, salesProducts, name, price,
            }, index) => (
              <ProductDetailCard
                key={ orderId }
                testid={ index }
                quantity={ salesProducts.quantity }
                name={ name }
                total={ (salesProducts.quantity * price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
                orderStatus={ statusNow }
              />
            ))}
          <p>
            Total: &nbsp;
            <span data-testid="order-total-value">
              { product && product.total_price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  match: PropTypes.PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.string,
  }).isRequired,
};

export default ProductDetails;
