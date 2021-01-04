import React, { useState, useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import MenuClient from '../../../components/MenuClient';
import OrderCard from '../../../components/OrderCard';
import { getOrders } from '../../../api';

// Requisito 7 - Criar Tela de Meus Pedidos
/*
Banco de Dados
table: sales
columns:
  id, user_id, total_price, sale_date, delivery_number

A busca no banco de dados precisa ser feita pelo user_id
*/
// 1 - top-title -> alterar no MenuClient/Header
// para ter um context para o title

// - Pegar o id do usuário (user_id) para acessar seus pedidos
//   (salesByUserId? no BACKEND)

const OrdersClient = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const user = localStorage.user || null;
    // Pegando os pedidos do banco de dados
    const { id } = jwtDecode(user);
    setRole(jwtDecode(user).role);
    getOrders(id)
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => 'um erro ocorreu');
  }, [history]);

  return (
    <>
      <MenuClient header="Meus Pedidos" />
      <Flex direction="column">
        {orders ? (
          orders.map((e) => <OrderCard order={ e } userRole={ role } key={ e.id } />)
        ) : (
          <Text>Loading...</Text>
        )}
      </Flex>
    </>
  );
};

export default OrdersClient;
