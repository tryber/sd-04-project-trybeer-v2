import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SalesDetails from '../components/OrderDetails/SalesDetails';
import { getDetailSales } from '../services/TrybeerApi';

function OrderDetail() {
  const { id } = useParams();
  const [details, setDetails] = useState(false);
  useEffect(() => {
    getDetailSales(id).then(({ data }) => setDetails(data));
  }, [id]);

  return (
    <>
      <Header>Detalhes de pedido</Header>
      {details ? <SalesDetails details={ details } /> : <Loading />}
    </>
  );
}

export default OrderDetail;
