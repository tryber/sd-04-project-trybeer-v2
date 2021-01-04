import React from 'react';
import '../../css/ordersDetails.css';

function SalesDetails({ details: { products, sale } }) {
  const { id: saleId, total_price: totalPrice, sale_date: dateSale } = sale;
  const { name } = JSON.parse(localStorage.getItem('user') || '{}');
  const options = {
    style: 'currency',
    currency: 'BRL',
  };
  const priceArrendodado = totalPrice.toLocaleString('pt-br', options);
  const date = new Date(dateSale).toLocaleDateString('pt-br', {
    day: '2-digit',
    month: 'numeric',
  });
  return (
    <div className="page-content">
      <div className="containerDetails">
        <div className="container2">
          <span className="tks">
            Obrigado pelo pedido,
            {name}
          </span>
        </div>
        <div className="cardDetails">
          <div className="flexDetails">
            <span className="elementsD" data-testid="order-number">
              Pedido
              {' '}
              {saleId}
            </span>
            <span className="elementsD" data-testid="order-date">
              {date}
            </span>
          </div>
          <div className="box">
            {products.map((product, i) => (
              <div key={ product.name }>
                <span data-testid={ `${i}-product-qtd` }>
                  {product.quantity}
                  {' '}
                  -
                  {' '}
                </span>
                <span data-testid={ `${i}-product-name` }>
                  {product.name}
                  {' '}
                  -
                  {' '}
                </span>
                <span data-testid={ `${i}-product-total-value` }>
                  {(
                    product.price * Number.parseFloat(product.quantity)
                  ).toLocaleString('pt-br', options)}
                </span>
              </div>
            ))}
          </div>
          <span className="total" data-testid="order-total-value">
            Total:
            {priceArrendodado}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SalesDetails;
