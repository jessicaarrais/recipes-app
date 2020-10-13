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

    &.invalid {
      outline-style: solid;
      outline-color: red;
    }
    &.valid {
      outline-style: solid;
      outline-color: green;
    }
  `,

  PasswordHint: styled.ul`
    font-size: 12px;
    margin: 8px 0;
    padding-left: 12px;
    color: grey;
  `,
};

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      email: $email
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      __typename
      success
      message
      token
    }
  }
`;

interface SignupResponse {
  signup: {
    success: boolean;
    message: string;
    token?: string;
  };
}

enum PasswordValidation {
  standart = 'standart',
  valid = 'valid',
  invalid = 'invalid',
}

function Signup() {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailInputSignup, setEmailInputSignup] = useState('');
  const [usernameInputSignup, setUsernameInputSignup] = useState('');
  const [passwordInputSignup, setPasswordInputSignup] = useState('');
  const [confirmPasswordInputSignup, setConfirmPasswordInputSignup] = useState('');

  const client = useApolloClient();

  const [signup, { error }] = useMutation<SignupResponse>(CREATE_USER, {
    onCompleted(data) {
      if (!data.signup.success) {
        setErrorMessage(data.signup.message);
        return;
      }
      data.signup.token && localStorage.setItem('token', data.signup.token);
      client.cache.reset();
    },
  });

  if (error) return <h1>An error has ocurred</h1>;

  const passwordValidation = validatePassword(passwordInputSignup);
  const confirmPasswordValidation = validateConfirmPassword(
    confirmPasswordInputSignup,
    passwordInputSignup
  );

  return (
    <S.Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup({
            variables: {
              email: emailInputSignup,
              username: usernameInputSignup,
              password: passwordInputSignup,
              confirmPassword: confirmPasswordInputSignup,
            },
          });
        }}
      >
        <S.Input
          placeholder="E-mail"
          value={emailInputSignup}
          onChange={(e) => setEmailInputSignup(e.target.value)}
        />
        <S.Input
          placeholder="Username"
          value={usernameInputSignup}
          onChange={(e) => setUsernameInputSignup(e.target.value)}
        />
        <div>
          {passwordValidation === 'invalid' && (
            <Typography color="error" variant="subtitle2" gutterBottom>
              Passwords do not match
            </Typography>
          )}
          <S.Input
            className={passwordValidation}
            type="password"
            placeholder="Password eg.: p@SSword2020"
            onChange={(e) => {
              setPasswordInputSignup(e.target.value);
            }}
          />
        </div>
        <div>
          {confirmPasswordValidation === 'invalid' && (
            <Typography color="error" variant="subtitle2" gutterBottom>
              Passwords do not match
            </Typography>
          )}
          <S.Input
            className={confirmPasswordValidation}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPasswordInputSignup(e.target.value);
            }}
          />
        </div>
        <S.PasswordHint>
          Your password must:
          <li>be betweem 8 and 12 characters;</li>
          <li>contain at least 1 number;</li>
          <li>contain at least 1 uppercase and lowercase letters of each.</li>
        </S.PasswordHint>
        {errorMessage !== '' && (
          <Typography color="error" variant="subtitle1" gutterBottom align="center">
            {errorMessage}
          </Typography>
        )}
        <Button type="submit" color="default" variant="contained" size="large" fullWidth>
          Signup
        </Button>
      </form>
    </S.Card>
  );
}

function validatePassword(password: string): PasswordValidation {
  const passwordRegex = new RegExp(
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$'
  );
  if (password.length < 8) {
    return PasswordValidation.standart;
  }
  return passwordRegex.test(password)
    ? PasswordValidation.valid
    : PasswordValidation.invalid;
}

function validateConfirmPassword(
  confirmPassword: string,
  password: string
): PasswordValidation {
  if (confirmPassword.length < 8) {
    return PasswordValidation.standart;
  }
  return confirmPassword !== password
    ? PasswordValidation.invalid
    : PasswordValidation.valid;
}

export default Signup;
