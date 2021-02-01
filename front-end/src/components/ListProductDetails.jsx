import React from 'react';

const ListProductDetails = (order, saleId) => (
  <div>
  {order[saleId].products.map((p, index) => (
    <div key={ `${order[saleId].id}item` }>
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
</div>)

export default ListProductDetails;
