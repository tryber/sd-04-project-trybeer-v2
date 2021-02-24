const isAuth = () => {
  const user = localStorage.getItem('user');
  if (!user) return false;
  return true;
};

export default isAuth;
