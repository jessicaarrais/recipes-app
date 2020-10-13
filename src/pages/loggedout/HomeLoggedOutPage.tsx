import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Login from '../../components/login-signup/Login';
import Signup from '../../components/login-signup/Signup';

function HomeLoggedOutPage() {
  const [login, setLogin] = useState(false);
  const [signin, setSignin] = useState(false);

  return (
    <>
      <h1>Cookbook</h1>
      <Button
        color="primary"
        variant="contained"
        size="medium"
        onClick={() => {
          setLogin(true);
          setSignin(false);
        }}
      >
        Login
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="medium"
        onClick={() => {
          setSignin(true);
          setLogin(false);
        }}
      >
        Signin
      </Button>
      <div>
        {login && <Login />}
        {signin && <Signup />}
      </div>
    </>
  );
}

export default HomeLoggedOutPage;
