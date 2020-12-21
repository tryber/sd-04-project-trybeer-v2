import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';
import Card from '../../components/ProductCard';
import Menu from '../../components/Menu';
import { getLS, setLS } from '../../utils';
import { Context } from '../../context/Provider';
import styles from './index.module.css';


const Products = () => {
  const [data, setData] = useState([]);
  const [login, setLogin] = useState(true);
  const { cart, setCart } = useContext(Context);
  const isInitialMount = React.useRef(true);

  useEffect(() => {
    // (async () => {
    //   const products = await api.productsAPI();
    //   const { token } = getLS('user') || {};
    //   if (!token) setLogin(false);
    //   setData(products);
    //   (() => (getLS('cart') ? setCart(getLS('cart')) : setCart([])))();
    // })();

    api.productsAPI().then((products) => {
      setData(products);
    })
    const { token } = getLS('user') || {};
    if (!token) setLogin(false);
    (() => (getLS('cart') ? setCart(getLS('cart')) : setCart([])))();
  }, [setCart]);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setLS('cart', cart);
    }
  });

  if (!login) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Menu nomeTela="TryBeer" />
      <div className={`${styles.containerCards} container-general`}>
        {data.map(({ urlImage, id, name, price }, index) => (
          <Card
            index={index}
            id={id}
            img={urlImage}
            name={name}
            price={price}
            key={`${name}-${index}`}
          />
        ))}
      </div>
      <footer className={styles.footerCart}>
        <span data-testid="checkout-bottom-btn-value">
          {`Total: R$ ${cart
            .reduce((acc, cur) => {
              const itemTotal = cur.price * cur.quantity;
              return acc + itemTotal;
            }, 0)
            .toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}`}
        </span>
        {cart.length === 0 ? (
          <button disabled className={styles.buttonCart} type="button" data-testid="checkout-bottom-btn">
            Ver Carrinho
          </button>
        ) : (
          <button className={styles.buttonCart} type="button" data-testid="checkout-bottom-btn">
            <Link to="/checkout">Ver Carrinho</Link>
          </button>
        )}
      </footer>
    </>
  );
};

export default Products;
