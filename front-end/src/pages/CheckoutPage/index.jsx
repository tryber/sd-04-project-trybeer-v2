import React from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu';
import InputForm from '../../components/InputForm';
import { setLS, getLS } from '../../utils/';
import { Context } from '../../context/Provider';
import api from '../../services/api';
import styles from './index.module.css';

const Checkout = () => {
  const { cart, setCart } = React.useContext(Context);
  const [form, setForm] = React.useState({ street: '', houseNumber: '' });
  const [finish, setFinish] = React.useState(null);
  const finishTimeout = React.useRef();
  const history = useHistory();

  React.useEffect(() => {
    const setState = () => setCart(getLS('cart'));
    setState();
  }, [setCart]);

  React.useEffect(() => {
    setLS('cart', cart);
  }, [cart]);

  React.useEffect(() => {
    return () => {
      clearTimeout(finishTimeout);
    };
  }, []);

  const handleRemove = (productId) => {
    const filteredCart = cart.filter(({ id }) => id !== productId);
    setCart(filteredCart);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    api.insertSaleAPI(
      getLS('userId'),
      cart.reduce((acc, cur) => {
        const itemTotal = cur.price * cur.quantity;
        return acc + itemTotal;
      }, 0),
      form.street,
      form.houseNumber,
      cart.map((product) => product.id),
      cart.map((product) => product.quantity),
    );
    setFinish('Compra realizada com sucesso!');
    setLS('cart', []);
    clearTimeout(finishTimeout.current);
    finishTimeout.current = setTimeout(() => {
      setFinish(null);
      history.push('/products');
    }, 3000);
  };

  if (!getLS('user') || !getLS('user').token) history.push('/login');
  return (
    <div className={styles.pageContainer}>
      <Menu nomeTela="Finalizar Pedido" />
      {finish ? <p className={styles.finishNotification}>{finish}</p> : null}
      <section className={styles.products}>
        <h2>Produtos</h2>
        {!cart || !cart.length ? (
          <h3>Não há produtos no carrinho</h3>
        ) : (
          <ul className={styles.cartList}>
            {cart.map(({ id, name, quantity, price }, index) => (
              <li key={name} className={styles.cartItem}>
                <div className={styles.cartItemLeftContainer}>
                  <span
                    className={styles.cartItemQty}
                    data-testid={`${index}-product-qtd-input`}
                  >
                    {quantity}
                  </span>
                  <span className={styles.dashSpace}>-</span>
                  <span
                    className={styles.cartItemName}
                    data-testid={`${index}-product-name`}
                  >
                    {name}
                  </span>
                </div>
                <div className={styles.cartItemRightContainer}>
                  <span
                    className={styles.unitaryPrice}
                    data-testid={`${index}-product-unit-price`}
                  >{`(${price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })} un)`}</span>
                  <span
                    className={styles.cartItemPrice}
                    data-testid={`${index}-product-total-value`}
                  >
                    {(price * quantity).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                  <button
                    className={styles.removeItemBtn}
                    onClick={() => handleRemove(id)}
                    data-testid={`${index}-removal-button`}
                  >
                    Remover item
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <h3
          className={styles.cartTotal}
          data-testid="order-total-value"
        >{`Total: ${cart
          .reduce((acc, cur) => {
            const itemTotal = cur.price * cur.quantity;
            return acc + itemTotal;
          }, 0)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}`}</h3>
      </section>
      <section className={styles.address}>
        <h2>Endereço</h2>
        <form onSubmit={handleSubmit} className={styles.addressForm}>
          <div className={styles.addressInputs}>
            <InputForm
              name="street"
              label="Rua"
              type="text"
              className={styles.addressInput}
              handleChange={handleInputChange}
              value={form.street}
              dataTestId="checkout-street-input"
            />
            <InputForm
              name="houseNumber"
              label="Número da casa"
              type="number"
              className={styles.addressInput}
              handleChange={handleInputChange}
              value={form.houseNumber}
              dataTestId="checkout-house-number-input"
            />
          </div>
          <button
            type="submit"
            className="buttonMain"
            data-testid="checkout-finish-btn"
            disabled={!cart.length || !form.street || !form.houseNumber}
          >
            Finalizar Pedido
          </button>
        </form>
      </section>
    </div>
  );
};

export default Checkout;
