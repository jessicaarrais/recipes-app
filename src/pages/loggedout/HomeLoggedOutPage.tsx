import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Login from '../../components/login-signup/Login';
import Signup from '../../components/login-signup/Signup';
import styled from 'styled-components';

const ButtonsWrapper = styled.div`
  display: block;
  width: 400px;
  margin: 32px auto;
`;

function HomeLoggedOutPage() {
  const [login, setLogin] = useState(false);
  const [signin, setSignin] = useState(false);

  return (
    <>
      <h1>Cookbook</h1>
      <ButtonsWrapper>
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
      </ButtonsWrapper>
      <div>
        {login && <Login />}
        {signin && <Signup />}
      </div>
    </>
  );
}

export default HomeLoggedOutPage;
