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
  ...props
}) => (
  <div className="fields-container">
    <label htmlFor={name} className="input-label">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      data-testid={dataTestId}
      className={className}
      {...props}
    />
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  dataTestId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
