import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Menu from '../../components/Menu';
import api from '../../services/api';
import { getLS } from '../../utils';
import styles from './index.module.css';

const styleStatus = (status) => {
  if (status === 'Pendente') {
    return styles.pendingOrder;
  }
  if (status === 'Preparando') {
    return styles.preparingOrder;
  }
  if (status === 'Entregue') {
    return styles.deliveredOrder;
  }
  return null;
};

const OrderDetails = () => {
  const [orderData, setOrderData] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      const order = await api.getSaleByIdAPI(id);
      setOrderData(order.data);
    })();
  }, [id]);

  if (!getLS('user') || !getLS('user').token) return <Redirect to="/login" />;
  return (
    <div className={ styles.pageContainer }>
      <Menu nomeTela="Detalhes de Pedido" />
      {!orderData ? (
        <h2>Pedido não encontrado</h2>
      ) : (
        <section className={ styles.orderDetails }>
          <h2 className={ styles.titleContainer }>
            <span data-testid="order-number">{`Pedido ${id}`}</span>
            <span className={ styles.date } data-testid="order-date">
              {new Date(orderData.saleDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
              })}
            </span>
          </h2>
          <h4
            className={ `${styles.orderStatus} ${styleStatus(orderData.status)}` }
          >
            { orderData.status }
          </h4>
          <ul className={ styles.orderList }>
            {orderData.products.map(
              ({
                name: productName,
                sales_products: product,
                price: productPrice,
              }, index) => (
                <li key={ productName } className={ styles.orderItem }>
                  <div className={ styles.orderItemLeftContainer }>
                    <span
                      className={ styles.orderItemQty }
                      data-testid={ `${index}-product-qtd` }
                    >
                      {product.quantity}
                    </span>
                    <span className={ styles.dashSpace }>-</span>
                    <span
                      className={ styles.orderItemName }
                      data-testid={ `${index}-product-name` }
                    >
                      {productName}
                    </span>
                  </div>
                  <div className={ styles.orderItemRightContainer }>
                    <span
                      className={ styles.unitaryPrice }
                      data-testid={ `${index}-order-unit-price` }
                    >
                      {`(${productPrice.toLocaleString('pt-BR',
                        { style: 'currency', currency: 'BRL' })})`}
                    </span>
                    <span
                      className={ styles.orderItemPrice }
                      data-testid={ `${index}-product-total-value` }
                    >
                      {(productPrice * product.quantity).toLocaleString(
                        'pt-BR',
                        {
                          style: 'currency',
                          currency: 'BRL',
                        },
                      )}
                    </span>
                  </div>
                </li>
              ),
            )}
          </ul>
          <h2
            className={ styles.orderTotal }
            data-testid="order-total-value"
          >
            {`Total: ${Number(orderData.totalPrice).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}`}
          </h2>
        </section>
      )}
    </div>
  );
};

export default OrderDetails;
