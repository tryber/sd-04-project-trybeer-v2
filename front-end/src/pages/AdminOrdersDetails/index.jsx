import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Menu from '../../components/AdminMenu';
import styles from './index.module.css';

const AdminOrdersDetails = () => {
  const [orderData, setOrderData] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      const order = await api.getSaleByIdAPI(id);
      setOrderData(order.data);
    })();
  }, [id]);

  React.useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  const handleStatus = async () => {
    await api.updateSaleStatusAPI(orderData[0].saleID, 'delivered');
    setOrderData(
      orderData.map((product) =>
        Object.assign({}, product, (product.status = 'delivered')),
      ),
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Menu />

      {!orderData ? (
        <h2>Pedido não encontrado</h2>
      ) : (
        <section className={styles.orderDetails}>
          <h2>
            <span data-testid="order-number">{`Pedido ${id} - `}</span>
            <span
              className={
                orderData[0].status === 'pending'
                  ? styles.pendingOrder
                  : styles.deliveredOrder
              }
              data-testid="order-status"
            >{`${
              orderData[0].status === 'pending' ? 'Pendente' : 'Entregue'
            }`}</span>
          </h2>
          <ul className={styles.orderList}>
            {orderData.map(
              ({ productName, productQuantity, productPrice }, index) => (
                <li key={productName} className={styles.orderItem}>
                  <div className={styles.orderItemLeftContainer}>
                    <span
                      className={styles.orderItemQty}
                      data-testid={`${index}-product-qtd`}
                    >
                      {productQuantity}
                    </span>
                    <span className={styles.dashSpace}>-</span>
                    <span
                      className={styles.orderItemName}
                      data-testid={`${index}-product-name`}
                    >
                      {productName}
                    </span>
                  </div>
                  <div className={styles.orderItemRightContainer}>
                    <span
                      className={styles.unitaryPrice}
                      data-testid={`${index}-order-unit-price`}
                    >{`(${productPrice.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })})`}</span>
                    <span
                      className={styles.orderItemPrice}
                      data-testid={`${index}-product-total-value`}
                    >
                      {(productPrice * productQuantity).toLocaleString(
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
            className={styles.orderTotal}
            data-testid="order-total-value"
          >{`Total: ${orderData[0].totalPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}`}</h2>
          {orderData[0].status === 'pending' ? (
            <button
              type="button"
              className="buttonMain"
              onClick={() => handleStatus()}
              data-testid="mark-as-delivered-btn"
            >
              Marcar como entregue
            </button>
          ) : null}
        </section>
      )}
    </div>
  );
};

export default AdminOrdersDetails;
