import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const ProductDetailCard = ({
  testid, quantity, name, uniPrice, total,
}) => (
  <div className="product-detail-card-body">
    <p>
      <span data-testid={ `${testid}-product-qtd` }>{ quantity }</span>
      &nbsp;-&nbsp;
      <span data-testid={ `${testid}-product-name` }>{ name }</span>
    </p>
    <span data-testid={ `${testid}-order-unit-price` }>{ uniPrice }</span>
    <span data-testid={ `${testid}-product-total-value` }>{ total }</span>
  </div>
);

ProductDetailCard.propTypes = {
  testid: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  uniPrice: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};

export default ProductDetailCard;
