import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { loadInitCart } from '../store/ducks/productsCart';
import { postOrder } from '../store/ducks/orders';
import { deleteFromLocalStorage } from '../services/localStorage';

const CheckoutForm = ({ total }) => {
  const zero = 0;
  const dispatch = useDispatch();
  // const history = useHistory();

  const cart = useSelector((state) => state.cartReducer.cart);

  const { user, session } = useSelector((state) => state.userReducer);

  const postOrderSuccess = useSelector(
    (state) => state.ordersReducer.postOrderSuccess,
  );

  const [address, setAddress] = useState({
    street: '',
    number: '',
  });

  // function goToProducts() {
  //   history.push('/products');
  // }

  const handleClick = () => {
    dispatch(loadInitCart({}));
    dispatch(
      postOrder(
        cart,
        user.id,
        user.email,
        total,
        address.street,
        address.number,
        session.token,
      ),
    );
    deleteFromLocalStorage('cart');
    // setTimeout(goToProducts, 3000);
  };

  return (
    <div>
      <div className="form">
        <form>
          <h3>Endereço</h3>
          <label htmlFor="street">
            Rua:
            <input
              name="street"
              type="text"
              data-testid="checkout-street-input"
              placeholder="Digit seu rua"
              value={ address.street }
              onChange={ (event) => setAddress({
                ...address,
                [event.target.name]: event.target.value,
              }) }
            />
          </label>
          <label htmlFor="number">
            Número da casa:
            <input
              name="number"
              type="number"
              data-testid="checkout-house-number-input"
              placeholder="Digit seu rua"
              value={ address.number }
              onChange={ (event) => setAddress({
                ...address,
                [event.target.name]: event.target.value,
              }) }
            />
          </label>
        </form>
      </div>
      <button
        type="button"
        data-testid="checkout-finish-btn"
        onClick={ handleClick }
        disabled={
          !total > zero
          || address.street.length < 1
          || address.number.length < 1
        }
      >
        Finalizar Pedido
        {' '}
      </button>
      {postOrderSuccess && <h2>Compra realizada com sucesso!</h2>}
    </div>
  );
};

CheckoutForm.propTypes = {
  total: PropTypes.number.isRequired,
};
export default CheckoutForm;
