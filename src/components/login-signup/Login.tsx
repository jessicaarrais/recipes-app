import React, { useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const Card = styled.div`
  width: 400px;
  margin: 32px auto;
  padding: 40px 56px;
  background-color: #ffffff;
  box-shadow: 1px 1px 1px 1px #bdbdbd;
  border-radius: 8px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 28px;
  margin: 8px 0 32px;
  padding: 0 8px;
  border: solid 1px gray;
  border-radius: 2px;
`;

const SignupButtonWrapper = styled.div`
  display: flex;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      token
    }
  }
`;

interface LoginResponse {
  login: {
    success: boolean;
    message: string;
    token?: string;
  };
}

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailInputLogin, setemailInputLogin] = useState('');
  const [passwordInputLogin, setPasswordInputLogin] = useState('');
  const client = useApolloClient();

  const [login, { error }] = useMutation<LoginResponse>(LOGIN, {
    onCompleted(data) {
      if (!data.login.success) {
        setErrorMessage(data.login.message);
        return;
      }
      data.login.token && localStorage.setItem('token', data.login.token);
      client.cache.reset();
    },
  });

  if (error) return <h1>An error has ocurred</h1>;

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ variables: { email: emailInputLogin, password: passwordInputLogin } });
        }}
      >
        <Input
          name="email"
          placeholder="E-mail"
          value={emailInputLogin}
          onChange={(e) => {
            setemailInputLogin(e.target.value);
          }}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={passwordInputLogin}
          onChange={(e) => {
            setPasswordInputLogin(e.target.value);
          }}
        />
        <SignupButtonWrapper>
          <Button type="submit" color="default" variant="contained" size="medium">
            Login
          </Button>
        </SignupButtonWrapper>
      </form>
      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Card>
  );
}

export default Login;
