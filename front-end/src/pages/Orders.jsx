import React, { useEffect, useState } from 'react';
import TopBar from '../components/ClientBar.jsx';
import api from '../services/api';
import MyOrdersCard from '../components/MyOrdersCard';
import { useHistory } from 'react-router-dom';


function Orders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory(); 
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    api
      .get('/orders', { headers: { Authorization: token } })
      .then((response) => setOrders(response.data))
      .catch((_err) => history.push('/login'));
      

  }, []);
  
  if (!orders) return <div>Carregando...</div>;
  console.log(JSON.stringify(orders));
  return (
  <div>
    <TopBar title={'Meus Pedidos'} isAdm={false} />
    <div className="main-container-orders">
    {orders.map((order, index) => (
      <MyOrdersCard
        key={order.id}
        index={index}
        orderId={order.id}
        orderDate={order.saleDate}  
        orderPriceSum={order.totalPrice}
      />
      ))}
    </div>
  </div>
  );
  }

export default Orders;
