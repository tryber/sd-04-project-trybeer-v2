import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import { addToCart, removeFromCart, updateQuantity } from '../../redux/actions';
import '../../css/pageProducts.css';

function CardProduct({
  quantity, index, info: { name, price, url_image: img }, info,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [starValue] = useState(Math.floor(Math.random() * 5) + 2);

  const priceArrendodado = price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  const dispatch = useDispatch();
  const handleCart = (number) => {
    if (number < 0 && !quantity) return null;
    if (!quantity) {
      dispatch(addToCart({
        ...info, number, index, quantity,
      }));
    } else if (quantity + number <= 0) dispatch(removeFromCart(info));
    else {
      dispatch(updateQuantity({
        ...info, number, index, quantity,
      }));
    }
    return null;
  };

  return (
    <div className="product-card scale-in-center">

      <div id="flex-container">
        <span data-testid={ `${index}-product-price` } className="product-price">
          {priceArrendodado}
        </span>
        {isFavorite
          ? <FavoriteIcon onClick={ () => setIsFavorite(!isFavorite) } style={ { color: 'red' } } />
          : <FavoriteBorderIcon onClick={ () => setIsFavorite(!isFavorite) } />}
      </div>

      <img
        data-testid={ `${index}-product-img` }
        src={ img }
        alt={ name }
      />

      <span data-testid={ `${index}-product-name` }>{name}</span>

      <Rating
        value={ starValue }
        precision={ 0.5 }
      />

      <div className="product-quantity">
        <button
          data-testid={ `${index}-product-minus` }
          onClick={ () => handleCart(-1) }
          type="button"
        >
          -
        </button>
        <span data-testid={ `${index}-product-qtd` }>{quantity || 0}</span>
        <button
          data-testid={ `${index}-product-plus` }
          onClick={ () => handleCart(1) }
          type="button"
        >
          +
        </button>
      </div>

    </div>
  );
}

export default CardProduct;
