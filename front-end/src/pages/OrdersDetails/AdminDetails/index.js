import React, { useContext, useEffect, useState } from 'react';
import {
  Flex, Text, Box, Container, Button,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
import MenuAdmin from '../../../components/MenuAdmin';
import { getAllSalesDetails, changeStatus } from '../../../api';
import { ProductContext } from '../../../context';

const AdminDetails = () => {
  const {
    details, setDetails,
  } = useContext(ProductContext);
  const { id: salesId } = useParams();
  const [products, setProducts] = useState([]);
  const {
    id, saleDate, totalPrice, status,
  } = details;
  const sliceOne = 5;
  const sliceTwo = 10;
  const formatDate = saleDate.slice(sliceOne, sliceTwo);

  useEffect(() => {
    getAllSalesDetails(salesId).then((response) => {
      setProducts(response.data);
    });
  }, [setProducts, salesId]);

  return (
    <Flex direction="row" h="100vh">
      <MenuAdmin />
      {details ? (
        <Container>
          <Flex fontWeight="bold" justify="space-between">
            <Box data-testid="order-number">
              Pedido
              {' '}
              {id}
            </Box>
            <Box data-testid="order-status">
              {status}
            </Box>
            <Box data-testid="order-date">
              {formatDate.split('-')[1]}
              /
              {formatDate.split('-')[0]}
            </Box>
          </Flex>

          {products ? products.map(
            ({
              prodQuan, prodName, prodPrice, price,
            }, i) => {
              const unitPrice = `(${price.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })})`;
              return (
                <Box key={ `${price}-${prodName}` }>
                  <Text data-testid={ `${i}-product-qtd` }>
                    Quantidade:
                    {prodQuan}
                  </Text>
                  <Text data-testid={ `${i}-product-name` }>{prodName}</Text>
                  <Text data-testid={ `${i}-order-unit-price` }>
                    Preço unitário do produto:
                    {unitPrice}
                  </Text>
                  <Text data-testid={ `${i}-product-total-value` }>
                    Valor Total:
                    {prodPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                  </Text>
                </Box>
              );
            },
          ) : <Text>Loading...</Text>}

          <Box fontWeight="bold" data-testid="order-total-value">
            Total:
            {' '}
            {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
          </Box>
          {/*
            - Caso o status do pedido seja pendente, um botão para marcar o
            pedido como entregue deve ser exibido. Caso contrário, não exiba o botão
            - Ao clicar no botão "Marcar pedido como entregue",
            o status desse pedido deve mudar para Entregue e o botão deve desaparecer.
          */}
          {status === 'Pendente' ? (
            <Button
              data-testid="mark-as-delivered-btn"
              onClick={ () => {
                changeStatus(salesId);
                setDetails({ ...details, status: 'Entregue' });
              } }
            >
              Marcar como entregue
            </Button>
          ) : (<div />)}
        </Container>
      ) : (
        <Text>Loading...</Text>
      )}
    </Flex>
  );
};

/* useEffect(() => {
    const user = localStorage.user || null;

    // Pegando os pedidos do banco de dados
    setRole(jwtDecode(user).role);
    getAllSales()
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => 'um erro ocorreu');
  }, [history]); */

export default AdminDetails;
