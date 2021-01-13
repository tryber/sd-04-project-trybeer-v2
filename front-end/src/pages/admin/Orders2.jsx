import React, { useEffect, useState } from 'react';
import SideBar from '../../components/ClientBar.jsx';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import CardOrders from '../../components/CardAdmOrders.jsx';
import './CSS/Orders.css';

const Orders = () => {
  const loginInStorage = JSON.parse(localStorage.getItem('cart'));
  let orderCount = 0;

  const [admOrders, setAdmOrders] = useState([]);
  const history = useHistory(); 
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    api
      .get('/allSales', { headers: { Authorization: token } })
      .then((response) => setAdmOrders(response.data))
      .catch((_err) => history.push('/login'));
      

  }, []);

  if (!loginInStorage) {
    return ( 
      <div className="bodyAdm">
        <SideBar title={'TryBeer'} isAdm={true} />
        <h2 className="pedidos-text">Pedidos</h2>
      </div>
    );
  }



  return (
    <div className="bodyAdm">
      <SideBar title={'TryBeer'} isAdm={true} />
      <div className="orders-container">
        <h2 className="pedidos-text">Pedidos</h2>
        <div>
          {console.log(admOrders)}
          {admOrders.map((order) => {
            orderCount += 1;
            const { total_price, delivery_address, delivery_number, status } = order;
            return (
              <CardOrders
                order={orderCount}
                address={delivery_address}
                number={delivery_number}
                price={total_price}
                status={status}
                key={`${orderCount}order`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
