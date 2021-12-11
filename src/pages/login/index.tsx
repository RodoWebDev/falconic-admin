import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import NavLogo from 'assets/imgs/nav_logo.png'
import { LoginContext } from 'contexts/LoginContextContainer';
import { useHistory } from 'react-router-dom';
import Spinner from 'components/loading';
import './styles.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 250,
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(LoginContext);
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleEmailChanged = (event: any) => {
    setEmail(event.target.value)
  }

  const handlePasswordChanged = (event: any) => {
    setPassword(event.target.value)
  }

  const handleRegister = () => {
    history.push('/register');
  }

  const submit = async () => {
    setLoading(true);
    try {
      const signUpResult: any = await login(email, password);
      if (signUpResult === 'Success') {
        setError(false);   
        history.push('/');
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }
  
  return (
    <div className="login_container">
      <form className={classes.root} noValidate autoComplete="off">
        {loading ?
          <Spinner />
        :
          <div className="login_form">
            <img src={NavLogo} alt="logo" />
            <TextField
              label="Email"
              id="outlined-size-small"
              value={email}
              variant="outlined"
              size="small"
              onChange={handleEmailChanged}
            />
            <TextField
              label="Password"
              type="password"
              id="outlined-size-small"
              value={password}
              variant="outlined"
              size="small"
              onChange={handlePasswordChanged}
            />
            {error && <Typography className="error">Login Failure</Typography>}
            <div className="btn_section">
              <Button variant="contained" color="primary" size="large" onClick={submit}>
                Log In
              </Button>
              <Button variant="contained" color="primary" size="large" onClick={handleRegister}>
                Register
              </Button>
            </div>
          </div>
        }
      </form>
    </div>
  )
}

export default Login
