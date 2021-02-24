import React, { useEffect, useState, useContext } from 'react';
import {
  Box, Button, Text, Image, Flex, Circle, Center,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { ProductContext } from '../../context';

// funcao verifica se tem itens no storage, se n tiver ele adiciona
function addStorage(id, name, price, urlImage, quantity) {
  const storage = JSON.parse(localStorage.cartItens);
  const additem = {
    id,
    name,
    price,
    urlImage,
    quantity,
  };
  storage.push(additem);
  localStorage.cartItens = JSON.stringify(storage);
}

// funcao para tirar itens do storage caso a quantidade seja 0
function subStorage(id) {
  const storage = JSON.parse(localStorage.cartItens);
  const newStorage = storage.filter((ele) => ele.id !== id);
  localStorage.cartItens = JSON.stringify(newStorage);
}

// funcao para atualizar quantidade do item no storage
function updateStorage(id, quantity) {
  const storage = JSON.parse(localStorage.cartItens);
  const newArray = storage.map((ele) => {
    if (ele.id === id) {
      ele.quantity = quantity;
      return ele;
    }
    return ele;
  });
  localStorage.cartItens = JSON.stringify(newArray);
}

function subButton(quantity, zero, setQuantity) {
  return quantity !== zero ? setQuantity(quantity - 1) : null;
}

// funcao que checa se tem item no storage e atualiza a quantidade
function checkStorage(id, zero, setQuantity) {
  const storage = localStorage.cartItens ? JSON.parse(localStorage.cartItens) : null;
  if (storage.length > zero) {
    storage.forEach((e) => {
      if (e.id === id) setQuantity(e.quantity);
      return null;
    });
  }
  return null;
}

export default function ProductCard(data) {
  const { setCartValue, totalValue } = useContext(ProductContext);
  const zero = 0;
  // variavel para formatacao do price
  // const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
  const {
    id, name, price, urlImage,
  } = data.data;

  const [quantity, setQuantity] = useState(zero);

  // roda quando o card eh montado, checa localstorage
  // checa se o item do card ja esta no localstorage e atribui a quantidade
  useEffect(() => {
    checkStorage(id, zero, setQuantity);
  }, [id]);

  // roda toda vez que o valor do "quantity" for alterado
  // checa se o item ja esta no localstorage, se tiver atualiza a quantidade,
  // se nao tiver adiciona o item
  useEffect(() => {
    // pega localStorage
    const storage = JSON.parse(localStorage.cartItens);
    // checa se o item ja esta no storage
    const newArray = storage.find((ele) => ele.id === id);
    // se o item n estiver no storage add
    if (!newArray) addStorage(id, name, price, urlImage, quantity);
    // se a quantidade for 0 tira do storage
    if (quantity === zero) subStorage(id);
    // atualiza o array
    storage.forEach((e) => {
      if (e.id === id) {
        updateStorage(id, quantity);
      }
    });
    setCartValue(totalValue());
  }, [id, name, price, quantity, setCartValue, totalValue, urlImage]);
  return (
    <Box bg="basegreen" w="full" my="10px" py="5px" borderRadius="25px" boxShadow="base">
      <Flex flexDirection="row" mx="10px" justifyContent="space-around">
        <Image height="100px" style={ { filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))' } } data-testid={ `${id - 1}-product-img` } src={ urlImage } alt="url da imagem" />
        <Flex flexDirection="column" w="200px">
          <Text textAlign="center" color="white" data-testid={ `${id - 1}-product-name` }>{name}</Text>
          <Text textAlign="center" color="white" data-testid={ `${id - 1}-product-price` }>
            R$
            {' '}
            {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
          </Text>
          <Center>
            <Flex alignItems="center" w="100px" justifyContent="space-between">
              <Circle size="10px">
                <Button
                  size="sm"
                  variant="solid"
                  data-testid={ `${id - 1}-product-minus` }
                  onClick={ () => subButton(quantity, zero, setQuantity) }
                >
                  <MinusIcon />
                </Button>
              </Circle>
              <Circle size="35px" bg="white" color="basegreen" border="2px solid" borderColor="white">
                <Text data-testid={ `${id - 1}-product-qtd` }>{quantity}</Text>
              </Circle>
              <Circle size="10px" boxShadow="xl">
                <Button
                  size="sm"
                  variant="solid"
                  data-testid={ `${id - 1}-product-plus` }
                  onClick={ () => setQuantity(quantity + 1) }
                >
                  <AddIcon />
                </Button>
              </Circle>
            </Flex>
          </Center>
        </Flex>
      </Flex>
    </Box>
  );
}
