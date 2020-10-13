import React, { useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import styled from 'styled-components';

const S = {
  Card: styled.div`
    max-width: 400px;
    margin: 32px auto;
    padding: 24px;
    background-color: #ffffff;
    box-shadow: 1px 1px 1px 1px #bdbdbd;
    border-radius: 8px;
  `,

  Input: styled.input`
    width: 100%;
    margin-bottom: 12px;
    padding: 12px;
    border: solid 1px lightgray;
    border-radius: 4px;
  `,
};

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
    <S.Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ variables: { email: emailInputLogin, password: passwordInputLogin } });
        }}
      >
        <S.Input
          name="email"
          placeholder="E-mail"
          value={emailInputLogin}
          onChange={(e) => {
            setemailInputLogin(e.target.value);
          }}
        />
        <S.Input
          type="password"
          name="password"
          placeholder="Password"
          value={passwordInputLogin}
          onChange={(e) => {
            setPasswordInputLogin(e.target.value);
          }}
        />
        {errorMessage !== '' && (
          <Typography color="error" variant="subtitle1" gutterBottom align="center">
            {errorMessage}
          </Typography>
        )}
        <Button type="submit" color="default" variant="contained" size="large" fullWidth>
          Login
        </Button>
      </form>
    </S.Card>
  );
}

export default Login;
