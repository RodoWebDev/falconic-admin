import React, { useEffect, useContext } from 'react';
import { LoginContext } from 'contexts/LoginContextContainer';
import { useHistory } from 'react-router';

const Logout = () => {

  const { logout } = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    logout();
    history.push('/login');
    /* eslint-disable-next-line */
  }, []);

  return <div />;
}

export default Logout
