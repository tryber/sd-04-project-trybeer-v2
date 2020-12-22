import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  name,
  handleChange,
  dataTestId,
  label,
  value,
  type,
  className,
}) => (
  <div className="fields-container">
    <label htmlFor={ name } className="input-label">
      {label}
    </label>
    <input
      type={ type }
      id={ name }
      name={ name }
      value={ value }
      onChange={ handleChange }
      data-testid={ dataTestId }
      className={ className }
    />
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default Input;
