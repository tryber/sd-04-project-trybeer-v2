import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';
import ADMOrdersCards from '../../components/ADMOrdersCards';
import SideMenuAdmin from '../../components/SideMenuAdmin';

import './styles.css';

const MyOrdersADM = () => {
  const [adminOrders, setAdminOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await api.get('/admin/orders');
      setAdminOrders(response.data);
    };
    getOrders();
  }, []);

  // if () return <Redirect to "/login">;

  return (
    <article className="ordereds-container">
      <aside>
        <SideMenuAdmin />
      </aside>
      <section className="admin-orders-loader">
        {adminOrders && adminOrders.map((order, index) => (
          <ADMOrdersCards
            key={ order.id }
            orders={ order }
            testid={ index }
          />
        ))}
      </section>
    </article>
  );
};

MyOrdersADM.propTypes = {
  orders: PropTypes.shape({
    id: PropTypes.number,
    deliveryAdress: PropTypes.string,
    deliveryNumber: PropTypes.number,
    status: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};

export default MyOrdersADM;
