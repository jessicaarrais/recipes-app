import React, { useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import Button from './Button';
import '../assets/css/login-signup.css';

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
      me {
        username
        token
      }
    }
  }
`;

function Signup() {
  const passwordRegex = new RegExp(
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$'
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailInputSignup, setEmailInputSignup] = useState('');
  const [usernameInputSignup, setUsernameInputSignup] = useState('');
  const [passwordInputSignup, setPasswordInputSignup] = useState('');
  const [confirmPasswordInputSignup, setConfirmPasswordInputSignup] = useState('');
  const [validPassword, setValidPassword] = useState('');
  const [validConfirmPassword, setValidConfirmPassword] = useState('');

  const client = useApolloClient();

  const [signup, { error }] = useMutation(CREATE_USER, {
    onCompleted(data) {
      if (!data.signup.success) {
        setErrorMessage(data.signup.message);
        return;
      }
      localStorage.setItem('token', data.signup.me.token);
      client.cache.reset();
    },
  });

  if (error) return <h1>An error has ocurred</h1>;

  return (
    <div className="login-signup-card">
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
        <input
          className="login-signup-input"
          placeholder="E-mail"
          value={emailInputSignup}
          onChange={(e) => setEmailInputSignup(e.target.value)}
        />
        <input
          className="login-signup-input"
          placeholder="Username"
          value={usernameInputSignup}
          onChange={(e) => setUsernameInputSignup(e.target.value)}
        />
        <div>
          {validPassword === 'invalid' && (
            <p className="error-message">Invalid password format</p>
          )}
          <input
            className={`login-signup-input ${validPassword}`}
            type="password"
            placeholder="Password eg.: p@SSword2020"
            onChange={(e) => {
              setPasswordInputSignup(e.target.value);
              if (e.target.value === '') {
                setValidPassword('');
              } else if (passwordRegex.test(e.target.value)) {
                setValidPassword('valid');
              } else {
                setValidPassword('invalid');
              }
            }}
          />
        </div>
        <div>
          {validConfirmPassword === 'invalid' && (
            <p className="error-message">Passwords do not match</p>
          )}
          <input
            className={`login-signup-input ${validConfirmPassword}`}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPasswordInputSignup(e.target.value);
              if (e.target.value === '') {
                setValidConfirmPassword('');
              } else if (passwordInputSignup !== e.target.value) {
                setValidConfirmPassword('invalid');
              } else {
                setValidConfirmPassword('valid');
              }
            }}
          />
        </div>
        <ul className="password-hint">
          Your password must:
          <li>be betweem 8 and 12 characters;</li>
          <li>contain at least 1 number;</li>
          <li>contain at least 1 uppercase and lowercase letters of each.</li>
        </ul>
        <div className="login-signup-btn">
          <Button type="submit" actionType="default">
            Signup
          </Button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Signup;
