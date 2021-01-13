import React from 'react';

import SideBar from '../../components/ClientBar.jsx';
import CardOrders from '../../components/CardAdmOrders.jsx';
import './CSS/Orders.css';

const Orders = () => {
  const loginInStorage = JSON.parse(localStorage.getItem('cart'));
  let orderCount = 0;

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
          {loginInStorage.map((order) => {
            orderCount += 1;
            const { price, quantity, address, status } = order;
            const totalPrice = parseFloat(price) * parseFloat(quantity);
            return (
              <CardOrders
                order={orderCount}
                address={address}
                price={totalPrice}
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
