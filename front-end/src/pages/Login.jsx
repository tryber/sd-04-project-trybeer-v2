import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState(null);
  const [token, setToken] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const validEmail = (email) =>
    /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email);

  const createToken = () =>
    axios
      .post('http://localhost:3001/login', { email, password })
      .then((res) => {
        setToken(res.data.token);
        setRedirect(true);
      })
      .catch((error) => console.log(error));

  if (token !== '') {
    const objUser = { name, email, token, role };
    localStorage.setItem('user', JSON.stringify(objUser));
  }

  if (role === 'administrator' && redirect)
    return <Redirect to="/admin/orders" />;

  if (role === 'client' && redirect) {
    return <Redirect to="/products" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (item) => item.email === email && item.password === password,
    );
    if (user) {
      const { name, role } = user;
      setName(name);
      setRole(role);
    }
    createToken();
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          data-testid="signin-btn"
          disabled={!validEmail(email) || password.length < 6}
        >
          ENTRAR
        </button>
      </form>
      <Link to="/register">
        <button type="button" data-testid="no-account-btn">
          Ainda não tenho conta
        </button>
      </Link>
    </div>
  );
};
export default connect(null, null)(Login);
