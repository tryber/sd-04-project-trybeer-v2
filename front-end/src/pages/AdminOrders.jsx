import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getSales } from '../services/TrybeerApi';
import '../css/ordersAdm.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const sendRequest = () => getSales();

  useEffect(() => {
    sendRequest().then((result) => setOrders(result.data));
  }, []);

  return (
    <div className="page">
      <Header>Trybeer</Header>
      <div className="admin-order-page">
        <h1>Admin Orders</h1>
        <div className="orders-listA">
          {orders.map(
            ({
              id, totalPrice, nameAdress, numberAdress, status,
            }, index) => (
              <Link key={ id } to={ `/admin/orders/${id}` } className="orders-card">
                <div className="first-part">
                  <span
                    className="element-orders"
                    data-testid={ `${index}-order-number` }
                  >
                    {`Pedido ${id}`}
                  </span>
                  <span
                    className="element-orders"
                    data-testid={ `${index}-order-address` }
                  >
                    {`rua ${nameAdress}, ${numberAdress}`}
                  </span>
                </div>
                <div className="first-part">
                  <span
                    className="element-orders"
                    data-testid={ `${index}-order-total-value` }
                  >
                    {`R$ ${totalPrice.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}`}
                  </span>

                  <span
                    className={ `element-orders ${status}` }
                    data-testid={ `${index}-order-status` }
                  >
                    {status}
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminOrders;
