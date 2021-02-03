import React, { useContext } from 'react';
import {
  Button,
  Container,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProductContext } from '../../context';

/*
Banco de Dados
table: sales
columns:
  id, user_id, total_price, sale_date, delivery_number

No componente
id, totalPrice, saleDate,
*/

const ChatCard = ({ order, userRole }) => {
  const {
    setDetails,
  } = useContext(ProductContext);
  const history = useHistory();
  const {
    id, saleDate, deliveryAddress, deliveryNumber, status, totalPrice,
  } = order;
  const sliceOne = 5;
  const sliceTwo = 10;
  const formatDate = saleDate.slice(sliceOne, sliceTwo);

  return (
    <Button
      border="1px solid black"
      borderRadius="5px"
      mb={ 2 }
      maxWidth="60ch"
      type="button"
      onClick={ () => {
        setDetails(order);
        if (userRole === 'client') return history.push(`/orders/${id}`);
        return history.push(`/admin/orders/${id}`);
      } }
    >
      <Container>
        <Flex
          direction="column"
          data-testid={ `${id - 1}-order-card-container` }
        >
          <Flex>
            <Text
              fontWeight="bold"
              data-testid={ `${id - 1}-order-number` }
            >
              Pedido
              {' '}
              { id }
            </Text>
            <Spacer />
            <Text data-testid={ `${id - 1}-order-date` }>
              {formatDate.split('-')[1]}
              /
              {formatDate.split('-')[0]}
            </Text>
            <>
              <Text data-testid={ `${id - 1}-order-address` }>
                {`${deliveryAddress}, ${deliveryNumber}`}
              </Text>
              <Text data-testid={ `${id - 1}-order-status` }>
                {status}
              </Text>
            </>
          </Flex>
          <Text
            fontWeight="bold"
            data-testid={ `${id - 1}-order-total-value` }
          >
            {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
          </Text>
        </Flex>
      </Container>
    </Button>
  );
};

export default ChatCard;

ChatCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.number,
    status: PropTypes.string,
    totalPrice: PropTypes.number,
  }),
  userRole: PropTypes.string,
};

ChatCard.defaultProps = {
  order: {
    id: 0,
    saleDate: '01-01',
    deliveryAddress: 'Rua Um',
    deliveryNumber: 1,
    status: 'Pendente',
    totalPrice: 0,
  },
  userRole: 'client',
};
