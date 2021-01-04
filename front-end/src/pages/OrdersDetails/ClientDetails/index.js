import React, { useContext, useEffect, useState } from 'react';
import {
  Flex, Text, Box, Container,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
import MenuClient from '../../../components/MenuClient';
// import OrderCard from '../../../components/OrderCard';
import { getSalesDetails } from '../../../api';
import { ProductContext } from '../../../context';

// Requisito 7 - Criar Tela de Meus Pedidos

/* Quando o link é acessado diretamente, os dados não são setados no context */

const ClientDetails = () => {
  const {
    details,
  } = useContext(ProductContext);
  const { id: salesId } = useParams();
  const [products, setProducts] = useState([]);
  const { id, saleDate, totalPrice } = details;
  const sliceOne = 5;
  const sliceTwo = 10;
  const formatDate = saleDate.slice(sliceOne, sliceTwo);

  useEffect(() => {
    getSalesDetails(salesId).then((response) => {
      setProducts(response.data);
    });
  }, [setProducts, salesId]);

  return (
    <>
      <MenuClient header="Meus Pedidos" />
      <Flex direction="column">
        {details ? (
          <Container>
            <Flex fontWeight="bold" justify="space-between">
              <Box data-testid="order-number">
                Pedido
                {' '}
                {id}
              </Box>
              <Box data-testid="order-date">
                {formatDate.split('-')[1]}
                /
                {formatDate.split('-')[0]}
              </Box>
            </Flex>
            <Box>
              Items
              {products ? (products.map(({ prodQuan, prodName, prodPrice }, i) => (
                <>
                  <Text data-testid={ `${i}-product-qtd` }>
                    Quantidade:
                    {prodQuan}
                  </Text>
                  <Text data-testid={ `${i}-product-name` }>
                    Nome do produto
                    {' '}
                    {prodName}
                  </Text>
                  <Text data-testid={ `${i}-product-total-value` }>
                    Valor Total:
                    {' '}
                    {prodPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                  </Text>
                </>
              )))
                : (
                  <p>Loading</p>
                )}
            </Box>
            <Box fontWeight="bold" data-testid="order-total-value">
              Total:
              {' '}
              {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
            </Box>
          </Container>
        ) : (
          <Text>Loading...</Text>
        )}
      </Flex>
    </>
  );
};

export default ClientDetails;
