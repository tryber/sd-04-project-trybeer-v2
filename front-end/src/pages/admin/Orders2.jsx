import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../../components/ClientBar';
import api from '../../services/api';
import CardOrders from '../../components/CardAdmOrders';
import './CSS/Orders.css';

const Orders = () => {
  const loginInStorage = JSON.parse(localStorage.getItem('cart'));

  const [admOrders, setAdmOrders] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    api
      .get('/allSales', { headers: { Authorization: token } })
      .then((response) => setAdmOrders(response.data))
      .catch(() => history.push('/login'));
  }, []);

  if (!loginInStorage) {
    return (
      <div className="bodyAdm">
        <SideBar title="TryBeer" isAdm />
        <h2 className="pedidos-text">Pedidos</h2>
      </div>
    );
  }

  const orderCount = [];
  orderCount.push(1);
  return (
    <div className="bodyAdm">
      <SideBar title="TryBeer" isAdm />
      <div className="orders-container">
        <h2 className="pedidos-text">Pedidos</h2>
        <div>
          {/*  console.log(`adm orders ${JSON.stringify(admOrders)}`)  */}
          {admOrders.map((order, index) => {
            orderCount[0] += 1;
            const {
              total_price: totalPrice, delivery_address: deliveryAddress,
              delivery_number: deliveryNumber, status,
            } = order;
            return (
              <CardOrders
                index={ index }
                order={ index+1 }
                address={ deliveryAddress }
                number={ deliveryNumber }
                price={ totalPrice }
                status={ status }
                key={ `${orderCount}order` }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
