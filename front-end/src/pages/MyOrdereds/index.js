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
      // console.log(response);
      setMyOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="ordereds-container">
      <Header title="Meus Pedidos" />
      {/* Rodar um map() depois */}
      <div className="ordereds-card-container">
        { myOrders
        && myOrders.map(({ orderId, totalPrice, saleDate }, index) => (
          <OrderedsCard
            key={ orderId }
            testid={ index }
            orderNumber={ orderId }
            total={ totalPrice }
            saleDate={ saleDate }
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
