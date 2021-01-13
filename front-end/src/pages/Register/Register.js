import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormRegister from '../../components/FormRegister';
import { saveToLocalStorage } from '../../services/localStorage';

const Register = () => {
  const { token, isLoggedIn } = useSelector((state) => state.userReducer.session);
  const userData = useSelector((state) => state.userReducer.user);
  const errors = useSelector((state) => state.userReducer.errors);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      saveToLocalStorage('user', { token, ...userData });

      history.push(userData.role === 'client' ? '/products' : '/admin/orders');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <FormRegister />
      {(errors.length)
        ? errors.map((error) => <span key={ error.code }>{ error.message }</span>)
        : null}
    </div>
  );
};

export default Register;
