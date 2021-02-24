import React from 'react';
import PropTypes from 'prop-types';

const BurguerMenuBtn = ({
  setNav,
  display,
  navStyle,
  transition,
  setTransition,
  navDisplayFalse,
  navDisplayTrue,
}) => (
  <button
    type="button"
    data-testid="top-hamburguer"
    className="menu-hamburger-btn"
    onClick={ () => {
      if (!display) {
        navDisplayFalse(setTransition, navStyle, setNav, display);
      } else {
        navDisplayTrue(setTransition, navStyle, setNav, display);
      }
    } }
  >
    <div className="menu-line-1" style={ { transform: transition.lineOne } } />
    <div className="menu-line-2" style={ { opacity: transition.lineTwo } } />
    <div className="menu-line-3" style={ { transform: transition.lineThree } } />
  </button>
);

BurguerMenuBtn.propTypes = {
  setNav: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
  navStyle: PropTypes.shape({
    animationName: PropTypes.string.isRequired,
  }).isRequired,
  transition: PropTypes.shape({
    lineOne: PropTypes.string,
    lineTwo: PropTypes.string,
    lineThree: PropTypes.string,
  }).isRequired,
  setTransition: PropTypes.func.isRequired,
  navDisplayFalse: PropTypes.func.isRequired,
  navDisplayTrue: PropTypes.func.isRequired,
};

export default BurguerMenuBtn;
