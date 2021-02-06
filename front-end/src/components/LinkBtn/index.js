import React from 'react';
import { Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkBtn = (props) => {
  const history = useHistory();
  const { route, children, testid } = props;

  const exit = children === 'Sair';

  return (
    <Button
      variant="outline"
      mt={ 3 }
      mr={ 3 }
      type="button"
      data-testid={ testid }
      onClick={ () => {
        if (exit) {
          localStorage.clear();
        }
        history.push(route);
      } }
    >
      {children}
    </Button>

  );
};

export default LinkBtn;

LinkBtn.propTypes = {
  route: PropTypes.string,
  children: PropTypes.string,
  testid: PropTypes.string,
};

LinkBtn.defaultProps = {
  route: '/',
  children: 'Button',
  testid: '',
};
