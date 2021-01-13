import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormLogin from '../../components/FormLogin';
import { saveToLocalStorage } from '../../services/localStorage';

const Login = () => {
  const { token, isLoggedIn } = useSelector((state) => state.userReducer.session);
  const userData = useSelector((state) => state.userReducer.user);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      saveToLocalStorage('user', { token, ...userData });

      history.push(userData.role === 'client' ? '/products' : '/admin/orders');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <FormLogin />
    </div>
  );
};

export default Login;
