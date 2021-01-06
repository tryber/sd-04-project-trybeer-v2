import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Menu from '../../components/AdminMenu';
import styles from './index.module.css';

const AdminOrdersDetails = () => {
  const [orderData, setOrderData] = React.useState(null);
  const [orderItem, setOrderItem] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      const order = await api.getSaleByIdAPI(id);
      console.log(order);
      setOrderData(order.data);
      setOrderItem(order.data.products);
    })();
  }, [id]);

  React.useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  const handleStatus = (orderStatus) => {
    api.updateSaleStatusAPI(orderData.id, orderStatus);
    return setOrderData({
      ...orderData,
      status: orderStatus,
    });
  };

  const styleStatus = () => {
    if (orderData.status === 'Pendente') {
      return styles.pendingOrder;
    }
    if (orderData.status === 'Preparando') {
      return styles.preparingOrder;
    }
    if (orderData.status === 'Entregue') {
      return styles.deliveredOrder;
    }
    return null;
  };

  return (
    <div className={ styles.pageContainer }>
      <Menu />

      {!orderData ? (
        <h2>Pedido não encontrado</h2>
      ) : (
        <section className={ styles.orderDetails }>
          <h2>
            <span data-testid="order-number">{`Pedido ${id} - `}</span>
            <span
              className={
                styleStatus()
              }
              data-testid="order-status"
            >
              {`${
                orderData.status
              }`}
            </span>
          </h2>
          <ul className={ styles.orderList }>
            {orderItem && orderItem.map(
              ({ name, sales_products: { quantity }, price }, index) => (
                <li key={ name } className={ styles.orderItem }>
                  <div className={ styles.orderItemLeftContainer }>
                    <span
                      className={ styles.orderItemQty }
                      data-testid={ `${index}-product-qtd` }
                    >
                      {quantity}
                    </span>
                    <span className={ styles.dashSpace }>-</span>
                    <span
                      className={ styles.orderItemName }
                      data-testid={ `${index}-product-name` }
                    >
                      {name}
                    </span>
                  </div>
                  <div className={ styles.orderItemRightContainer }>
                    <span
                      className={ styles.unitaryPrice }
                      data-testid={ `${index}-order-unit-price` }
                    >
                      {`(${price && price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })})`}
                    </span>
                    <span
                      className={ styles.orderItemPrice }
                      data-testid={ `${index}-product-total-value` }
                    >
                      {(price * quantity).toLocaleString(
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
            {`Total: ${orderData.total_price && orderData.total_price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}`}
          </h2>
          {orderData.status === 'Pendente' ? (
            <button
              type="button"
              className="buttonMain"
              onClick={ () => handleStatus('Preparando') }
              data-testid="mark-as-prepared-btn"
            >
              Preparar pedido
            </button>
          ) : ''}
          {orderData.status === 'Pendente' ? (
            <button
              type="button"
              className="buttonMain"
              onClick={ () => handleStatus('Entregue') }
              data-testid="mark-as-delivered-btn"
            >
              Marcar como entregue
            </button>
          ) : ''}
        </section>
      )}
    </div>
  );
};

export default AdminOrdersDetails;
