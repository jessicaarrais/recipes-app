import React, { useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import Button from '../components/Button';
import '../assets/css/login-signup.css';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      me {
        token
      }
    }
  }
`;

function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailInputLogin, setemailInputLogin] = useState('');
  const [passwordInputLogin, setPasswordInputLogin] = useState('');
  const client = useApolloClient();

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      if (!data.login.success) {
        setErrorMessage(data.login.message);
        return;
      }
      localStorage.setItem('token', data.login.me.token);
      client.cache.reset();
    },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has ocurred</h1>;

  return (
    <div className="login-signup-card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ variables: { email: emailInputLogin, password: passwordInputLogin } });
        }}
      >
        <input
          name="email"
          className="login-signup-input"
          placeholder="E-mail"
          value={emailInputLogin}
          onChange={(e) => {
            setemailInputLogin(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          className="login-signup-input"
          placeholder="Password"
          value={passwordInputLogin}
          onChange={(e) => {
            setPasswordInputLogin(e.target.value);
          }}
        />
        <div className="login-signup-btn">
          <Button type="submit" actionType="default">
            Login
          </Button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Login;
