import React, { useEffect, useContext } from 'react';
import { Button, Container, Box, Flex, SimpleGrid, Input, Text } from '@chakra-ui/react';
import { ProductContext } from '../../context';

export default function CheckoutCard(data) {
  // chama o contex para atualizar o valor do carrinho
  const {
    setCartValue, totalValue, cartItens, setCartItens,
  } = useContext(ProductContext);

  // dados recebidos de props
  const {
    name, price, quantity, id,
  } = data.data;
  const finalPrice = `(R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })} un)`;
  const valorTotal = (quantity * price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });

  // funcao de remocao do produto
  function handleClick(ida, productsLista, setProductsLista) {
  // retira o produto da lista de produtos
    const newStorage = productsLista.filter((ele) => ele.id !== ida);
    // atualiza a lista de prodtos
    setProductsLista(newStorage);
    localStorage.cartItens = JSON.stringify(newStorage);
    // remove a div do produto
    document.getElementById(`${ida}`).remove();
  }

  // quando monta o card cria a lista local de produtos
  useEffect(() => {
    const storage = localStorage.cartItens ? JSON.parse(localStorage.cartItens) : [];
    setCartItens(storage);
  }, [setCartItens]);

  // toda vez q a lista for modificada reatribui o valor total do carrinho
  useEffect(() => {
    setCartValue(totalValue());
  }, [cartItens, setCartValue, totalValue]);

  return (
    <Container id={ `${id}` } bgColor="#EDF2F7">
      <Text data-testid={ `${id - 1}-product-qtd-input` }>Quantidade: {quantity}</Text>
      <Text data-testid={ `${id - 1}-product-name` }>{name}</Text>
      <Text fontSize="sm" fontStyle="italic" data-testid={ `${id - 1}-product-unit-price` }>{finalPrice}</Text>
      <Text data-testid={ `${id - 1}-product-total-value` }>{valorTotal}</Text>
      <Button
        colorScheme="red"
        size="sm"
        type="button"
        data-testid={ `${id - 1}-removal-button` }
        onClick={ () => handleClick(id, cartItens, setCartItens) }
      >
        X
      </Button>
    </Container>
  );
}
