import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/AdminMenu';
import api from '../../services/api';
import styles from './index.module.css';

const AdminOrders = () => {
  const [ordersData, setOrdersData] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const orders = await api.getSalesTb();
      setOrdersData(orders.data.sales);
    })();
  }, []);

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

  return (
    <div className={ styles.pageContainer }>
      <Menu />
      <section className={ styles.orders }>
        <h2>Pedidos pendentes</h2>
        {!ordersData || !ordersData.length ? (
          <h3>Não há pedidos registrados</h3>
        ) : (
          <ul className={ styles.ordersList }>
            {ordersData.map(
              (
                {
                  id,
                  status,
                  totalPrice,
                  deliveryAddress,
                  deliveryNumber,
                },
                index,
              ) => (
                <Link to={ `/admin/orders/${id}` } key={ id }>
                  <li className={ styles.orderItem }>
                    <div
                      className={ styles.orderNumber }
                      data-testid={ `${index}-order-number` }
                    >
                      {`Pedido ${id}`}
                    </div>
                    <div
                      className={ styles.orderAddress }
                      data-testid={ `${index}-order-address` }
                    >
                      {`${deliveryAddress}, ${deliveryNumber}`}
                    </div>
                    <div
                      className={ styles.orderValue }
                      data-testid={ `${index}-order-total-value` }
                    >
                      {totalPrice && Number(totalPrice).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                    <div
                      className={ `${styles.orderStatus} ${
                        styleStatus(status)
                      }` }
                      data-testid={ `${index}-order-status` }
                    >
                      {status}
                    </div>
                  </li>
                </Link>
              ),
            )}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminOrders;
