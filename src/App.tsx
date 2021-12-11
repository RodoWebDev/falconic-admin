import React from 'react';
import './App.css';
import LoginContextContainer, { LoginContext } from 'contexts/LoginContextContainer';
import { PrivateRoutes, PublicRoutes } from 'utils/routes';
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <LoginContextContainer>
        <LoginContext.Consumer>
          {loginContext => loginContext.user
            ? <PrivateRoutes />
            : <PublicRoutes />
          }
        </LoginContext.Consumer>
      </LoginContextContainer>
    </Router>
  );
}

export default App;
