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
      width: 200,
    },
  },
}));

const Register = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(false);
  const { register } = useContext(LoginContext);
  const history = useHistory();

  const handleEmailChanged = (event: any) => {
    setEmail(event.target.value)
  }

  const handlePasswordChanged = (event: any) => {
    setPassword(event.target.value)
  }

  const handleNameChanged = (event: any, type: string) => {
    if (type === 'firstname') {
      setFirstName(event.target.value);
    } else {
      setLastName(event.target.value);
    }
  }

  const handleLogin = () => {
    history.push('/login');
  }

  const submit = async () => {
    setLoading(true);
    try {
      const signUpResult: any = await register(firstName, lastName, email, password);
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
              label="First Name"
              id="outlined-firstname"
              value={firstName}
              variant="outlined"
              size="small"
              onChange={(e) => handleNameChanged(e, 'firstname')}
            />
            <TextField
              label="LastName"
              id="outlined-lastname"
              value={lastName}
              variant="outlined"
              size="small"
              onChange={(e) => handleNameChanged(e, 'lastname')}
            />
            <TextField
              label="Email"
              id="outlined-email"
              value={email}
              variant="outlined"
              size="small"
              onChange={handleEmailChanged}
            />
            <TextField
              label="Password"
              type="password"
              id="outlined-password"
              value={password}
              variant="outlined"
              size="small"
              onChange={handlePasswordChanged}
            />
            {error && <Typography className="error">Register Failure</Typography>}
            <div className="btn_section">
              <Button variant="contained" color="primary" size="large" onClick={submit}>
                Register
              </Button>
              <Button variant="contained" color="primary" size="large" onClick={handleLogin}>
                Log In
              </Button>
            </div>
          </div>
        }
      </form>
    </div>
  )
}

export default Register
