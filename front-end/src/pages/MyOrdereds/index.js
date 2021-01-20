import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import OrderedsCard from '../../components/OderedsCard';

import api from '../../services/api';

import './styles.css';

const MyOrdereds = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api.get('/orders');
      setMyOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="ordereds-container">
      <Header title="Meus Pedidos" />
      <div className="ordereds-card-container">
        { myOrders
        && myOrders.map((
          {
            id: orderId,
            total_price: totalPrice,
            sale_date: saleDate,
            status: orderStatus,
          },
          index,
        ) => (
          <OrderedsCard
            key={ orderId }
            testid={ index }
            orderNumber={ orderId }
            total={ totalPrice }
            saleDate={ saleDate }
            orderStatus={ orderStatus }
          />
        )) }
      </div>
    </div>
  );
};

// deliveryAddress: "R. Praia das Torres"
// deliveryNumber: "207"
// orderId: 1
// saleDate: "2020-11-25T00:00:00.000Z"
// status: "feito"
// totalPrice: 10.5
// userId: 1

export default MyOrdereds;
